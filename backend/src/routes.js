import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import FileController from './app/controllers/FileController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

// Students
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);
routes.get('/students/:id', StudentController.show);
routes.get('/students', StudentController.index);

// Checkins
routes.get('/checkins', CheckinController.index);
routes.get('/students/:id/checkins', CheckinController.show);
routes.post('/students/:id/checkins', CheckinController.store);

// HelpOrders
routes.get('/help-orders', HelpOrderController.index);
routes.get('/help-orders/:id', HelpOrderController.show);
routes.post('/help-orders/:id/answer', HelpOrderController.store);
routes.get('/students/:id/help-orders', StudentHelpOrderController.index);
routes.post('/students/:id/help-orders', StudentHelpOrderController.store);
routes.put('/students/:id/help-orders', StudentHelpOrderController.update);

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

// Files
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
