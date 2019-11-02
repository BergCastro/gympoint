import Sequelize from 'sequelize';
// import mongoose from 'mongoose';
import Checkin from '../app/models/Checkin';
import User from '../app/models/User';
import Student from '../app/models/Student';
import File from '../app/models/File';
import Plan from '../app/models/Plan';
import Enrollment from '../app/models/Enrollment';
import HelpOrder from '../app/models/HelpOrder';
import 'dotenv/config';

import databaseConfig from '../config/database';

const models = [User, Student, File, Plan, Enrollment, Checkin, HelpOrder];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // mongo() {
  //   this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
  //     useNewUrlParser: true,
  //     useFindAndModify: true,
  //     useUnifiedTopology: true,
  //   });
  // }
}

export default new Database();
