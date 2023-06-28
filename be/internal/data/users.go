package data

import (
	"database/sql"
	"errors"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type UserModel struct {
	DB *sql.DB
}

func (m UserModel) Insert(user *User) error {
	query := `
	INSERT INTO users (name, email, password_hash)
	VALUES ($1, $2, $3)
	RETURNING id, created_at`

	err := m.DB.QueryRow(query, user.Name, user.Email, user.Password.hash).Scan(&user.ID, &user.CreatedAt)
	if err != nil {
		return err
	}

	return nil
}

func (m UserModel) GetByEmail(email string) (*User, error) {
	query := `
	SELECT id, created_at, name, email, password_hash, status
	FROM users
	WHERE email = $1`

	var user User
	err := m.DB.QueryRow(query, email).Scan(&user.ID, &user.CreatedAt, &user.Name, &user.Email, &user.Password.hash, &user.Status)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (m UserModel) GetByID(id int64) (*User, error) {
	query := `
	SELECT id, created_at, name, email, status
	FROM users
	WHERE id = $1`

	var user User
	err := m.DB.QueryRow(query, id).Scan(&user.ID, &user.CreatedAt, &user.Name, &user.Email, &user.Status)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrRecordNotFound
		default:
			return nil, err
		}
	}

	return &user, nil
}

func (u UserModel) GetAll() ([]*User, error) {
	query := `
	SELECT id, name, email
	FROM users`

	rows, err := u.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := []*User{}

	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Name, &user.Email)
		if err != nil {
			return nil, err
		}
		users = append(users, &user)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return users, nil
}

func (u UserModel) Delete(userID int64) error {
	query := `
	DELETE FROM users
	WHERE id = $1`

	result, err := u.DB.Exec(query, userID)
	if err != nil {
		return err
	}
	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return ErrRecordNotFound
	}
	return nil
}

func (u UserModel) Update(user *User) error {
	query := `
	UPDATE users
	SET name=$1, email=$2, password_hash=$3, status=$4
	WHERE id = $5
	RETURNING id, name, email, status`

	return u.DB.QueryRow(query, user.Name, user.Email, user.Password.hash, user.Status, user.ID).Scan(&user.ID, &user.Name, &user.Email, &user.Status)
}

type User struct {
	ID        int64     `json:"id"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  password  `json:"-"`
	Status    bool      `json:"status,omitempty"`
}

type password struct {
	plaintext *string
	hash      []byte
}

func (p *password) Set(plaintext string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(plaintext), 12)
	if err != nil {
		return err
	}
	p.plaintext = &plaintext
	p.hash = hash

	return nil
}

func (p password) Compare(plaintext string) (bool, error) {
	err := bcrypt.CompareHashAndPassword(p.hash, []byte(plaintext))
	if err != nil {
		switch {
		case errors.Is(err, bcrypt.ErrMismatchedHashAndPassword):
			return false, nil
		default:
			return false, err
		}
	}
	return true, nil
}
