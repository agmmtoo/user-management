package main

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/pascaldekloe/jwt"
)

func (app *application) authenticate(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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
		fmt.Print(userID)

		// set user in context
		next.ServeHTTP(w, r)
	})
}
