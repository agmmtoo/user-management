package main

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/pascaldekloe/jwt"
)

func (app *application) createAuthTokenHandler(w http.ResponseWriter, r *http.Request) {
	// var input struct {
	// 	Email    string `json:"email"`
	// 	Password string `json:"password"`
	// }

	var claims jwt.Claims
	claims.Subject = strconv.FormatInt(1, 10)
	claims.Issued = jwt.NewNumericTime(time.Now())
	claims.NotBefore = jwt.NewNumericTime(time.Now())
	claims.Expires = jwt.NewNumericTime(time.Now().Add(7 * 24 * time.Hour))
	claims.Issuer = "ymfl"
	claims.Audiences = []string{"ymfl"}

	jwtBytes, err := claims.HMACSign(jwt.HS256, []byte(app.config.jwt.secret))
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}
	fmt.Fprintf(w, "%s", string(jwtBytes))
}
