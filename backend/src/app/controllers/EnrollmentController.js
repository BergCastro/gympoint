import * as Yup from 'yup';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'enrollment_enable',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'idade', 'peso', 'altura'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async show(req, res) {
    const enrollment = await Enrollment.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'idade', 'peso', 'altura'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    if (!enrollment) {
      return res.json({ error: 'This enrollment no exists' });
    }

    return res.json(enrollment);
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
      enrollment_enable,
    } = await Enrollment.create(req.body);
    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
      enrollment_enable,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      plan_id: Yup.number().integer(),
      student_id: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment not exists.' });
    }

    const {
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    } = await enrollment.update(req.body);

    const plan = await Plan.findByPk(plan_id);

    const student = await Student.findByPk(student_id);

    return res.json({
      id,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        idade: student.idade,
        peso: student.peso,
        altura: student.altura,
        avatar_id: student.avatar_id,
      },
      plan: {
        id: plan.id,
        title: plan.title,
        duration: plan.duration,
        price: plan.price,
      },
      start_date,
      end_date,
      price,
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
