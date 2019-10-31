import * as Yup from 'yup';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const checkins = await Checkin.findAll({
      attributes: ['id', 'created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'idade', 'peso', 'altura'],
        },
      ],
    });

    return res.json(checkins);
  }

  async show(req, res) {
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
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const checkin = await Checkin.create(req.body);

    return res.json(checkin);
  }
}

export default new CheckinController();
