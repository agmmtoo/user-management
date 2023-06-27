package main

import "net/http"

func (app *application) logError(r *http.Request, err error) {
	app.logger.err.Fatalf("%s\t%s\t%s", r.Method, r.URL.Path, err)
}

func (app *application) errorResponse(w http.ResponseWriter, r *http.Request, status int, message interface{}) {
	// ignore write errors
	w.WriteHeader(status)
	w.Write([]byte(message.(string)))
}

func (app *application) notFoundResponse(w http.ResponseWriter, r *http.Request) {
	app.errorResponse(w, r, http.StatusNotFound, http.StatusText(http.StatusNotFound))
}

func (app *application) invalidCredentialsResponse(w http.ResponseWriter, r *http.Request) {
	app.errorResponse(w, r, http.StatusUnauthorized, http.StatusText(http.StatusUnauthorized))
}

func (app *application) serverErrorResponse(w http.ResponseWriter, r *http.Request, err error) {
	app.logError(r, err)
	app.errorResponse(w, r, http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
}
