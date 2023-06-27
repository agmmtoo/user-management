package data

import (
	"database/sql"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type UserModel struct {
	DB *sql.DB
}

func (m UserModel) Insert(user *User) error {
	query := `
	INSERT INTO users (name, email, hash)
	VALUES ($1, $2, $3)
	RETURNING id, created_at`

	err := m.DB.QueryRow(query, user.Name, user.Email, user.Password.hash).Scan(&user.ID, &user.CreatedAt)
	if err != nil {
		return err
	}

	return nil
}

type User struct {
	ID        int64     `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  password  `json:"-"`
	Status    bool      `json:"status"`
}

type password struct {
	plaintext *string
	hash      []byte
}

func (p password) Set(plaintext string) error {
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
		return false, err
	}
	return true, nil
}
