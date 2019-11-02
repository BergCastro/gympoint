import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { helporder } = data;

    await Mail.sendMail({
      to: `${helporder.student.name} <${helporder.student.email}>`,
      subject: 'Sua pergunta foi respondida',
      template: 'answer',
      context: {
        student: helporder.student.name,
        question: helporder.question,
        answer: helporder.answer,
      },
    });
  }
}

export default new HelpOrderMail();
