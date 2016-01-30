# nodejs-rest-api-boilerplate
Create Rest API using NodeJS + ExpressJS + SocketIO

### Dependencies

- Redis

### How To Setup

```sh
git clone https://github.com/odenktools/nodejs-rest-api-boilerplate.git
cd nodejs-rest-api-boilerplate
npm install
```

Create MySQL database, named it "nodejs_rest_api"

go to userguide folder then import nodejs_rest_api.sql

## Installing Redis and running Redis Server

- Install to c:\redis\
- copy redis.conf file to c:\redis\bin\
- after that, open Windows command prompt

```sh
cd c:\redis\bin\
redis-server
```

### Running the boilerplate

```sh
npm start
```

### Begin the test

```sh
curl -i -X POST http://localhost:9999/mahasiswa/insert -d "nama_mhs=whois&kelas_mhs=whois@gmail.com"
```

```sh
curl -i -X GET http://localhost:9999/mahasiswa/getAll
```