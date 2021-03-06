import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// Checkins
routes.get('/checkins', CheckinController.index); // verificar necessidade
routes.get('/students/:id/checkins', CheckinController.show);
routes.post('/students/:id/checkins', CheckinController.store);

// help-orders
routes.post('/help-orders/:id/answer', HelpOrderController.store);
routes.get('/students/:id/help-orders', StudentHelpOrderController.index);
routes.post('/students/:id/help-orders', StudentHelpOrderController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

// Students
routes.post('/students', StudentController.store);
routes.get('/students/:id', StudentController.show);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);
routes.get('/students', StudentController.index);

// HelpOrders
routes.get('/help-orders', HelpOrderController.index);
// routes.get('/help-orders/:id', HelpOrderController.show);

// routes.put('/students/:id/help-orders', StudentHelpOrderController.update);

// Packages
routes.post('/packages', PlanController.store);
routes.put('/packages/:id', PlanController.update);
routes.delete('/packages/:id', PlanController.delete);
routes.get('/packages/:id', PlanController.show);
routes.get('/packages', PlanController.index);

// Enrollments
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);
routes.get('/enrollments/:id', EnrollmentController.show);
routes.get('/enrollments', EnrollmentController.index);

export default routes;
