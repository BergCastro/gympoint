import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import HelpOrderMail from '../jobs/HelpOrderMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;
    try {
      const helporders = await HelpOrder.findAll({
        where: { answer: null },
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
      const helporder = await HelpOrder.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
        raw: true,
      });

      if (!helporder) {
        return res.json({ error: 'This help order no exists' });
      }

      return res.json(helporder);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        answer: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }
      const helporder = await HelpOrder.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'email'],
          },
        ],
      });

      if (!helporder) {
        return res.json({ error: 'This help order no exists' });
      }

      req.body.answer_at = new Date();

      await helporder.update(req.body);
      await Queue.add(HelpOrderMail.key, {
        helporder,
      });
      return res.json(helporder);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new HelpOrderController();
