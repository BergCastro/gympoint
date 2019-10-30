import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, Student, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
