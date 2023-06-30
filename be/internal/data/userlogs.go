package data

import (
	"database/sql"
	"time"
)

type UserLogModel struct {
	DB *sql.DB
}

type Event string

const (
	EventCreate Event = "create"
	EventUpdate Event = "update"
	EventDelete Event = "delete"
)

func (m UserLogModel) Insert(log *UserLog) error {
	query := `
	INSERT INTO userlogs (user_id, event, data)
	VALUES ($1, $2, $3)
	RETURNING id, created_at
	`

	return m.DB.QueryRow(query, log.UserID, log.Event, log.Data).Scan(&log.ID, &log.CreatedAt)
}

type UserLogWithUser struct {
	UserLog
	User struct {
		ID    int64  `json:"id"`
		Name  string `json:"name"`
		Email string `json:"email"`
	} `json:"user"`
}

func (m UserLogModel) GetAll() ([]*UserLogWithUser, error) {
	rows, err := m.DB.Query(`
	SELECT ul.id, ul.created_at, ul.event, ul.data, u.id, u.name, u.email
	FROM userlogs ul
	INNER JOIN users u
	ON u.id = ul.user_id
	ORDER BY ul.created_at DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	logs := []*UserLogWithUser{}

	for rows.Next() {
		var log UserLogWithUser
		err = rows.Scan(&log.ID, &log.CreatedAt, &log.Event, &log.Data, &log.User.ID, &log.User.Name, &log.User.Email)
		if err != nil {
			return nil, err
		}
		logs = append(logs, &log)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return logs, nil
}

type UserLog struct {
	ID        int64     `json:"id"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	UserID    int64     `json:"user_id,omitempty"`
	Event     Event     `json:"event"`
	Data      string    `json:"data"`
}
