# Programma-group/Postgres-starter

Comes with:

- ES6 support
- [Objection](http://vincit.github.io/objection.js/) ORM with [Knex](https://www.knex.org) migrations
- API documentation using Swagger
- ESLint for code linting
- Configuration management using dotenv
- Logging of requests with Winston
- Tests using Jest
- Coverage report through jest

---

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [PostgreSQL](https://www.postgresql.org/download/)

## Setup

Clone the repository, install the dependencies and get started right away.

    $ git clone git@github.com:programma-group/starter-postgres.git <application-name>
    $ cd <application-name>
    $ rm -rf .git
    $ npm install

Make a copy of `.env.example` as `.env` and update your application details and database credentials.

### Environment variables description

- `DB_HOST`: Database's host
- `DB_USER`: Database's user
- `DB_PASS`: Password used to connect to the PostgreSQL database
- `DB_NAME`: Database's name
- `DB_PORT`: Database's port
- `DB_MIN_POOL`: Minimum number of open connections that can be used by knex's pool manager
- `DB_MAX_POOL`: Maximum number of open connections that can be used by knex's pool manager
- `MAIL_HOST`: Host used by nodemailer when it sends an email
- `MAIL_PORT`: Port used by nodemailer when it sends an email
- `MAIL_USER`: User used by nodemailer when it sends an email
- `MAIL_PASSWORD`: Password used by nodemailer when it sends an email
- `SECRET`: Secret key used to encrypt JWT tokens
- `URL`: The server's URL. Used by swagger docs explorer

### Running the migrations

Now, run the migrations and seed the database.


    $ npm run migrate
    $ npm run seed

Finally, start the application.

    $ npm run start

Navigate to [http://localhost:3000/docs/](http://localhost:3000/docs/) to verify the instalation.

## Creating a Migration

In order to create a new migration use

    $ npx knex migrate:make [name of your migration] --knexfile=src/knexfile.js

For example

    $ npx knex migrate:make add_token --knexfile=src/knexfile.js
    
## Tests

To run the tests you need to create a separate test database. You should create a `.env.test` file with your test settings. Then you can run the tests by using

    $ npm run test

## Contributing

For contribution and feature requests, please create an [issue](https://github.com/programma-group/starter-postgres/issues) first.

## License

starter-postgres is under [MIT License](LICENSE).

