package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.NotFound = http.HandlerFunc(app.notFoundResponse)
	// router.MethodNotAllowed = http.HandlerFunc(app.methodNotAllowed)

	router.HandlerFunc(http.MethodGet, "/v1/users", app.authenticate(app.listUsersHandler))
	router.HandlerFunc(http.MethodPost, "/v1/users", app.createUserHandler)
	router.HandlerFunc(http.MethodGet, "/v1/users/:id", app.authenticate(app.showUserHandler))
	router.HandlerFunc(http.MethodPatch, "/v1/users/:id", app.authenticate(app.updateUserHandler))
	router.HandlerFunc(http.MethodDelete, "/v1/users/:id", app.authenticate(app.deleteUserHandler))

	router.HandlerFunc(http.MethodPost, "/v1/tokens/authentication", app.createAuthTokenHandler)

	router.HandlerFunc(http.MethodGet, "/v1/userlogs", app.listUserlogsHandler)

	return app.enableCORS(http.Handler(router))
}
