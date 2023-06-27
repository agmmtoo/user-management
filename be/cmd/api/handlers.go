package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *application) routes() *http.Handler {
	router := httprouter.New()

	// router.NotFound = http.HandlerFunc()
	// router.MethodNotAllowed = http.HandlerFunc(app.methodNotAllowed)

	// router.HandlerFunc(http.MethodGet, "/v1/users", app.listUsersHandler)
	// router.HandlerFunc(http.MethodPost, "/v1/users", app.createUserHandler)
	// router.HandlerFunc(http.MethodGet, "/v1/users/:id", app.showUserHandler)
	// router.HandlerFunc(http.MethodPatch, "/v1/users/:id", app.updateUserHandler)
	// router.HandlerFunc(http.MethodDelete, "/v1/users/:id", app.deleteUserHandler)

	// router.HandlerFunc(http.MethodGet, "/v1/tokens/authentication", app.createAuthenticationToken)

	// router.HandlerFunc(http.MethodGet, "/v1/healthcheck", app.healthcheck)

	return router
}
