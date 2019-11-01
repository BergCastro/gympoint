import * as Yup from 'yup';
import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;
    try {
      const helporders = await HelpOrder.findAll({
        attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
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

      return res.json(helporders);
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

      const helporders = await HelpOrder.findAll({
        where: { student_id: req.params.id },
        attributes: ['id', 'created_at'],
        raw: true,
      });

      const studentHelpOrders = {
        student,
        helporders,
      };

      return res.json(studentHelpOrders);
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
        question: Yup.string().required(),
        answer: Yup.string(),
        answer_at: Yup.date(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const helporder = await HelpOrder.create(req.body);

      return res.status(201).json(helporder);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new HelpOrderController();
