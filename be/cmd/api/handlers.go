package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PATCH", "DELETE"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		Debug:            false,
	})

	router.NotFound = http.HandlerFunc(app.notFoundResponse)

	router.HandlerFunc(http.MethodGet, "/v1/ping", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Pong!"))
	}))

	router.HandlerFunc(http.MethodGet, "/v1/users", app.authenticate(app.listUsersHandler))
	router.HandlerFunc(http.MethodPost, "/v1/users", app.authenticate(app.createUserHandler))
	router.HandlerFunc(http.MethodGet, "/v1/users/:id", app.authenticate(app.showUserHandler))
	router.HandlerFunc(http.MethodPatch, "/v1/users/:id", app.authenticate(app.updateUserHandler))
	router.HandlerFunc(http.MethodDelete, "/v1/users/:id", app.authenticate(app.deleteUserHandler))

	router.HandlerFunc(http.MethodPost, "/v1/tokens/authentication", app.createAuthTokenHandler)

	router.HandlerFunc(http.MethodGet, "/v1/userlogs", app.authenticate(app.listUserlogsHandler))

	return app.recoverPanic(app.logRequest(c.Handler(http.Handler(router))))
}
