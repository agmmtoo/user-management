package main

import "net/http"

func (app *application) authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, *http.Request) {
		token := 
	})
}