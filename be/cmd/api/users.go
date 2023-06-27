package main

import (
	"net/http"

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

	err = app.writeJSON(w, http.StatusCreated, map[string]any{"user": user})
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) listUsersHandler(w http.ResponseWriter, r *http.Request) {
	users, err := app.models.Users.GetAll()
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, map[string]any{"users": users})
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}