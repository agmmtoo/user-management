package main

import (
	"net/http"

	"agmmtoo.me/be/internal/data"
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

func (app *application) logUserAction(r *http.Request, action data.Event, logdata string) error {
	user, ok := r.Context().Value("user").(*data.User)
	if !ok {
		// no user in context, self-register
		return nil
	}
	log := &data.UserLog{
		UserID: user.ID,
		Event:  action,
		Data:   logdata,
	}
	err := app.models.UserLogs.Insert(log)
	if err != nil {
		app.logger.err.Println(err, "failed to log user action")
		return err
	}
	return nil
}
