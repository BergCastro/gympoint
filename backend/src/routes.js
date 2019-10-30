import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.get('/students/:id', StudentController.show);
routes.get('/students', StudentController.index);
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
