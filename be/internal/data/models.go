package data

import (
	"database/sql"
)

type Models struct {
	Users UserModel
	// UserLogs UserLogModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		Users: UserModel{DB: db},
		// UserLogs: UserLogModel{DB: db},
	}
}
