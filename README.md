# nodejs-rest-api-boilerplate
Create Rest API using NodeJS + ExpressJS + SocketIO

### How To Setup

```sh
git clone https://github.com/odenktools/nodejs-rest-api-boilerplate.git
cd nodejs-rest-api-boilerplate
npm install
```

Create MySQL database, named it "nodejs_rest_api"

go to userguide folder then import nodejs_rest_api.sql


### Running the boilerplate

```sh
npm start
```

### Begin the test
```sh
curl -i -X POST http://localhost:9999/user/insert -d "id=1&username=admin&email=odenktools86@gmail.com"
```