package main

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"agmmtoo.me/be/internal/data"
)

func (app *application) createUserHandler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := app.readJSON(w, r, &input)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	user := &data.User{
		Name:  input.Name,
		Email: input.Email,
	}

	err = user.Password.Set(input.Password)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.models.Users.Insert(user)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	// log user action
	go func() {
		err = app.logUserAction(r, data.EventCreate, fmt.Sprintf("#%d%s(%s)", user.ID, user.Name, user.Email))
		if err != nil {
			app.serverErrorResponse(w, r, err)
		}
	}()

	err = app.writeJSON(w, http.StatusCreated, map[string]any{"user": user})
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) listUsersHandler(w http.ResponseWriter, r *http.Request) {
	type input struct {
		Id    int64  `json:"id"`
		Name  string `json:"name"`
		Email string `json:"email"`
	}

	users, err := app.models.Users.GetAll()
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	result := []input{}

	for _, user := range users {
		result = append(result, input{
			Id:    user.ID,
			Name:  user.Name,
			Email: user.Email,
		})
	}

	err = app.writeJSON(w, http.StatusOK, map[string]any{"users": result})
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) showUserHandler(w http.ResponseWriter, r *http.Request) {
	id, err := app.readIDParam(r)
	if err != nil {
		app.notFoundResponse(w, r)
		return
	}

	user, err := app.models.Users.GetByID(id)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			app.notFoundResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	err = app.writeJSON(w, http.StatusOK, map[string]any{"user": user})
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) deleteUserHandler(w http.ResponseWriter, r *http.Request) {
	id, err := app.readIDParam(r)
	if err != nil {
		app.notFoundResponse(w, r)
		return
	}

	err = app.models.Users.Delete(id)
	if err != nil {
		switch {
		case err == data.ErrRecordNotFound:
			app.notFoundResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	// log user action
	go func() {
		err = app.logUserAction(r, data.EventDelete, fmt.Sprintf("id=%d", id))
		if err != nil {
			app.serverErrorResponse(w, r, err)
		}
	}()

	err = app.writeJSON(w, http.StatusOK, map[string]any{"status": "success"})
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

}

func (app *application) updateUserHandler(w http.ResponseWriter, r *http.Request) {
	id, err := app.readIDParam(r)
	if err != nil {
		app.notFoundResponse(w, r)
		return
	}
	user, err := app.models.Users.GetByID(id)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.notFoundResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}
	var input struct {
		Name     *string `json:"name"`
		Email    *string `json:"email"`
		Password *string `json:"password"`
		Status   *bool   `json:"status"`
	}
	err = app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r)
		return
	}

	var logData string

	if input.Name != nil {
		user.Name = *input.Name
		logData += "name: " + *input.Name + " "
	}
	if input.Email != nil {
		user.Email = *input.Email
		logData += "email: " + *input.Email + " "
	}
	if input.Status != nil {
		user.Status = *input.Status
		logData += "status: " + strconv.FormatBool(*input.Status) + " "
	}
	if input.Password != nil {
		if err = user.Password.Set(*input.Password); err != nil {
			app.serverErrorResponse(w, r, err)
			return
		}
		logData += "password: " + *input.Password + " "
	}

	err = app.models.Users.Update(user)

	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	go func() {
		err = app.logUserAction(r, data.EventUpdate, logData)
		if err != nil {
			app.serverErrorResponse(w, r, err)
		}
	}()

	err = app.writeJSON(w, http.StatusOK, map[string]any{
		"user": user,
	})

	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
