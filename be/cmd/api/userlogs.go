package main

import (
	"net/http"
)

func (app *application) listUserlogsHandler(w http.ResponseWriter, r *http.Request) {
	logs, err := app.models.UserLogs.GetAll()
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}
	err = app.writeJSON(w, http.StatusOK, map[string]any{"logs": logs})
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
