### Using this project with the packages modules

Install all packages for the project:
```bash
$ npm install
```

### Configure database manager
- Modify `config.json` file in `config` repository with your username and password access to database manager.
- Launch your database manager.
- Create database.

```bash
$ sequelize db:create database_name_config
```

- Migrate models in database.

```bash
$ sequelize db:migrate
```

- Write seeds in database.

```bash
$ sequelize db:seed:all
```

### Launch server

```bash
$ npm start
```
