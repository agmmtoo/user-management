# README

[Visit](http://35.174.106.143/)

email: `admin@example.com`
password: `admin`

## Setup Walkthrough

### Backend

#### install psql

```bash
sudo apt-get update
sudo apt-get install postgresql
```

#### create db

```bash
sudo -u postgres createdb dbname
```

#### create db user

```sql
CREATE ROLE user WITH LOGIN PASSWORD 'password';
```

#### store db dsn in env

`/etc/environment`

```bash
sudo chmod 644 /etc/environment

```

```env
PORT=
DB_URL=postgres://user:password@localhost/dbname
JWT_SECRET=
```

#### install migrate tool

```bash
curl -L https://github.com/golang-migrate/migrate/releases/download/v4.16.2/migrate.darwin-amd64.tar.gz | tar xvz
sudo mv migrate /usr/local/bin
```

#### copy migrations from local to server

```bash
scp -i ~/path/to/key/key.pem -r ./be/migrations user@ec2-ip.compute-1.amazonaws.com:~
```

#### run migrations

```bash
migrate -path ./migrations -database $DB_URL up
```

#### copy built binary from local to server

```bash
scp -i ~/path/to/key/key.pem ./be/bin/api user@ec2-ip.compute-1.amazonaws.com:~
```

#### copy service file from local to server

```bash
scp -i ~/path/to/key/key.pem ./be/api.service user@ec2-ip.compute-1.amazonaws.com:~
```

#### run server as service

```bash
sudo mv api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl start api
sudo systemctl enable api
```

#### check status

```bash
sudo systemctl status api
sudo journalctl -u api -f
```

#### install nginx

```bash
sudo apt-get install nginx
```

#### copy backend nginx config from local to server

```bash
scp -i ~/path/to/key/key.pem ./be/nginx.conf
```

### Frontend

#### copy built frontend from local to server

```bash
scp -i ~/path/to/key/key.pem -r ./fe/dist user@ec2-ip.compute-1.amazonaws.com:/var/www/fe
```

#### copy frontend nginx config from local to server

```bash
scp -i ~/path/to/key/key.pem ./fe/nginx.conf
```

#### restart nginx

```bash
sudo systemctl restart nginx
```