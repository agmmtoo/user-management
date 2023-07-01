# README

[Visit](http://13.250.116.55/)

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

```sql
create database dbname;
/c dbname;
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
curl -L https://github.com/golang-migrate/migrate/releases/download/v4.16.2/migrate.linux-amd64.tar.gz | tar xvz
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

#### setup nginx

```bash
sudo apt-get install nginx
```

```bash
scp -i ~/path/to/key/key.pem ./nginx.conf user@ec2-ip.compute-1.amazonaws.com:/etc/nginx/sites-available/default
sudo systemctl restart nginx
```

### Frontend

#### copy built frontend from local to server

```bash
scp -i ~/path/to/key/key.pem -r ./fe/dist user@ec2-ip.compute-1.amazonaws.com:/var/www/html
```

