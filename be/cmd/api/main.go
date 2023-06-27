package main

import (
	"context"
	"database/sql"
	"flag"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"
)

type config struct {
	port int
	db   struct {
		url string
	}
	cors struct {
		trustedOrigins []string
	}
}

type application struct {
	config config
}

func main() {
	var config config

	env_port, _ := strconv.ParseInt(os.Getenv("PORT"), 10, 64)
	flag.IntVar(&config.port, "port", int(env_port), "Server port")
	flag.StringVar(&config.db.url, "dburl", os.Getenv("DATABASE_URL"), "PostgreSQL DB URL")

	flag.Parse()

	// init logger
	// logger :=

	// init db connection
	db, err := openDB(config)
	if err != nil {
		// logger.PrintFatal(err, nil)
	}
	defer db.Close()

	app := &application{
		config: config,
	}

	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", config.port),
		Handler: app.routes(),
	}

	err = server.ListenAndServe()
	// errLog.Fatal(err)
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
