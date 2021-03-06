import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import Checkin from '../models/Checkin';

class StudentController {
  async index(req, res) {
    const { q = '' } = req.query;

    const students = await Student.findAll({
      where: { name: { [Op.iLike]: `%${q}%` } },
      attributes: ['id', 'name', 'email', 'idade', 'peso', 'altura'],
    });

    return res.json(students);
  }

  async show(req, res) {
    const student = await Student.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'name', 'email', 'idade', 'peso', 'altura'],
    });

    if (!student) {
      return res.json({ error: 'This student no exists' });
    }

    const { id, name, email, idade, peso, altura } = student;

    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number()
        .integer()
        .positive()
        .max(150)
        .required(),
      peso: Yup.number()
        .positive()
        .max(400)
        .required(),
      altura: Yup.number()
        .positive()
        .max(3)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, idade, peso, altura } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
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

    const student = await Student.findByPk(req.params.id);

    if (email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email, id: { [Op.ne]: req.params.id } },
      });

      if (studentExists) {
        return res
          .status(400)
          .json({ error: 'Other User already has this email.' });
      }
    }

    const { id, name, idade, peso, altura } = await student.update(req.body);

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
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'This Student not exists' });
    }

    await student.destroy();

    return res.status(200).json({ message: 'Student deleted successfully' });
  }
}

export default new StudentController();
