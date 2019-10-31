import * as Yup from 'yup';
import { Op } from 'sequelize';
import Enrollment from '../models/Enrollment';
import File from '../models/File';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'name', 'email', 'idade', 'peso', 'altura'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async show(req, res) {
    const enrollment = await Enrollment.findOne({
      where: { id: req.params.id },
      attributes: [
        'id',
        'name',
        'email',
        'idade',
        'peso',
        'altura',
        'avatar_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!enrollment) {
      return res.json({ error: 'This enrollment no exists' });
    }

    const { id, name, email, idade, peso, altura, avatar } = enrollment;

    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
      avatar,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      student_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    } = await Enrollment.create(req.body);

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      idade: Yup.number()
        .integer()
        .positive()
        .max(130),
      peso: Yup.number()
        .positive()
        .max(400),
      altura: Yup.number()
        .positive()
        .max(3),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const enrollment = await Enrollment.findByPk(req.params.id);

    if (email !== enrollment.email) {
      const enrollmentExists = await Enrollment.findOne({
        where: { email, id: { [Op.ne]: req.params.id } },
      });

      if (enrollmentExists) {
        return res
          .status(400)
          .json({ error: 'Other User already has this email.' });
      }
    }

    const { id, name, idade, peso, altura } = await enrollment.update(req.body);

    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
    });
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ error: 'This Enrollment not exists' });
    }

    await enrollment.destroy();

    return res.status(200).json({ message: 'Enrollment deleted successfully' });
  }
}

export default new EnrollmentController();
