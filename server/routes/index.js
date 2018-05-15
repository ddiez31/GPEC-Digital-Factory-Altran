const consultantsController = require('../controllers').consultants;
const levelsController = require('../controllers').levels;
const projectsController = require('../controllers').projects;
const type_usersController = require('../controllers').type_users;
const usersController = require('../controllers').users;
const type_skillsController = require('../controllers').type_skills;
const skillsController = require('../controllers').skills;

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/api', (req, res) => res.status(200).send({ message: 'Welcome to the routes API!' }));

    app.post('/api/login', usersController.login);

    app.post('/api/user', usersController.create);
    app.get('/api/users', usersController.list);
    app.get('/api/users/:userId', usersController.retrieve);
    app.put('/api/users/:userId', usersController.update);
    app.delete('/api/users/:userId', usersController.destroy);

    app.post('/api/consultant', consultantsController.create);
    app.get('/api/consultants', consultantsController.list);
    app.get('/api/consultants/:consultantId', consultantsController.retrieve);
    app.put('/api/consultants/:consultantId', consultantsController.update);
    app.delete('/api/consultants/:consultantId', consultantsController.destroy);

    app.post('/api/project', projectsController.create);
    app.get('/api/projects', projectsController.list);
    app.get('/api/projects/:projectId', projectsController.retrieve);
    app.put('/api/projects/:projectId', projectsController.update);
    app.delete('/api/projects/:projectId', projectsController.destroy);

    app.post('/api/skill', skillsController.create);
    app.get('/api/skills', skillsController.list);
    app.put('/api/skills/:skillId', skillsController.update);
    app.delete('/api/skills/:skillId', skillsController.destroy);

    app.get('/api/levels', levelsController.list);
    app.get('/api/type_users', type_usersController.list);
    app.get('/api/type_skills', type_skillsController.list);

};