import * as Yup from 'yup';
import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { page = 1 } = req.query;
    try {
      const checkins = await Checkin.findAll({
        attributes: ['id', 'created_at'],
        limit: 10,
        offset: (page - 1) * 10,
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'email', 'idade', 'peso', 'altura'],
          },
        ],
      });

      return res.json(checkins);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const student = await Student.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'name', 'email', 'idade', 'peso', 'altura'],
        raw: true,
      });

      if (!student) {
        return res.json({ error: 'This student no exists' });
      }

      const checkins = await Checkin.findAll({
        where: { student_id: req.params.id },
        attributes: ['id', 'created_at'],
        raw: true,
      });

      const studentCheckins = {
        student,
        checkins,
      };

      return res.json(studentCheckins);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        student_id: Yup.number()
          .integer()
          .required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const sevenDaysAgo = subDays(new Date(), 7);

      const checkinsLastSevenDays = await Checkin.findAndCountAll({
        where: {
          created_at: { [Op.gte]: sevenDaysAgo },
          student_id: req.params.id,
        },
      });

      if (checkinsLastSevenDays.count >= 5) {
        return res.status(403).json({
          error: 'You already have five checkins in the last seven days',
        });
      }

      const checkin = await Checkin.create(req.body);

      return res.status(201).json(checkin);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new CheckinController();
