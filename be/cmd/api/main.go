package main

import (
	"context"
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"agmmtoo.me/be/internal/data"
	_ "github.com/lib/pq"
)

type config struct {
	port int
	db   struct {
		url string
	}
	// cors struct {
	// 	trustedOrigins []string
	// }
	jwt struct {
		secret string
	}
}

type application struct {
	config config
	logger struct {
		info *log.Logger
		err  *log.Logger
	}
	models data.Models
}

func main() {
	// parse flags, set config
	var config config

	env_port, _ := strconv.ParseInt(os.Getenv("PORT"), 10, 64)
	flag.IntVar(&config.port, "port", int(env_port), "Server port")
	flag.StringVar(&config.db.url, "dburl", os.Getenv("DATABASE_URL"), "PostgreSQL DB URL")
	flag.StringVar(&config.jwt.secret, "jwt-secret", os.Getenv("JWT_SECRET"), "JWT secret key")

	flag.Parse()

	// logger
	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)
	logger := struct {
		info *log.Logger
		err  *log.Logger
	}{
		info: infoLog,
		err:  errLog,
	}

	// db connection
	db, err := openDB(config)
	if err != nil {
		errLog.Fatal(err)
	}
	defer db.Close()

	app := &application{
		config: config,
		logger: logger,
		models: data.NewModels(db),
	}

	server := &http.Server{
		Addr:     fmt.Sprintf(":%d", config.port),
		Handler:  app.routes(),
		ErrorLog: errLog,
	}

	infoLog.Printf("Starting server on %s", server.Addr)
	err = server.ListenAndServe()
	errLog.Fatal(err)
}

func openDB(config config) (*sql.DB, error) {
	// open db connection
	db, err := sql.Open("postgres", config.db.url)
	if err != nil {
		return nil, err
	}

	// check db connection with 5s timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// ping db
	err = db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	return db, nil
}
