import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class StudentHelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;
    try {
      const helporders = await HelpOrder.findAll({
        where: { student_id: req.params.id },
        attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
        limit: 10,
        offset: (page - 1) * 10,
      });

      const student = await Student.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'name', 'email', 'idade', 'peso', 'altura'],
      });

      return res.json({
        student,
        helporders,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        question: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      req.body.student_id = req.params.id;

      const helporder = await HelpOrder.create(req.body);

      return res.status(201).json(helporder);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        question: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const helporder = await HelpOrder.findByPk(req.params.id);

      await helporder.update(req.body);

      return res.status(200).json(helporder);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new StudentHelpOrderController();
