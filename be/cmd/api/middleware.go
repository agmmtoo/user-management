package main

import (
	"context"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/pascaldekloe/jwt"
)

func isRegistrationRoute(r *http.Request) bool {
	return r.URL.Path == "/v1/users" && r.Method == http.MethodPost
}

func (app *application) optionalAuth(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")

		headerParts := strings.Split(authHeader, " ")
		if len(headerParts) != 2 || headerParts[0] != "Bearer" {
			next.ServeHTTP(w, r)
			return
		}
		token := headerParts[1]
		claims, err := jwt.HMACCheck([]byte(token), []byte(app.config.jwt.secret))
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}

		if !claims.Valid(time.Now()) {
			next.ServeHTTP(w, r)
			return
		}

		userID, err := strconv.ParseInt(claims.Subject, 10, 64)
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}
		user, err := app.models.Users.GetByID(userID)
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}

		ctx := context.WithValue(r.Context(), "user", user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (app *application) authenticate(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if isRegistrationRoute(r) {
			app.optionalAuth(next).ServeHTTP(w, r)
			return
		}

		authHeader := r.Header.Get("Authorization")

		headerParts := strings.Split(authHeader, " ")
		if len(headerParts) != 2 || headerParts[0] != "Bearer" {
			app.invalidCredentialsResponse(w, r)
			return
		}
		token := headerParts[1]

		claims, err := jwt.HMACCheck([]byte(token), []byte(app.config.jwt.secret))
		if err != nil {
			app.invalidCredentialsResponse(w, r)
			return
		}

		if !claims.Valid(time.Now()) {
			app.invalidCredentialsResponse(w, r)
			return
		}

		userID, err := strconv.ParseInt(claims.Subject, 10, 64)

		if err != nil {
			app.invalidCredentialsResponse(w, r)
			return
		}

		user, err := app.models.Users.GetByID(userID)
		if err != nil {
			app.invalidCredentialsResponse(w, r)
			return
		}

		ctx := context.WithValue(r.Context(), "user", user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (app *application) logRequest(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		next.ServeHTTP(w, r)
		app.logger.info.Printf("%s - %s %s %s", r.RemoteAddr, r.Proto, r.Method, r.URL)
	})
}

func (app *application) recoverPanic(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				w.Header().Set("Connection", "close")
				app.errorResponse(w, r, http.StatusInternalServerError, "panic recovery error")
			}
		}()
		next.ServeHTTP(w, r)
	})
}
