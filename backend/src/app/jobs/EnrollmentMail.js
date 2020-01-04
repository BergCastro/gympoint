import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

function formatDate(date) {
  return format(parseISO(date), "d 'de' MMMM' de 'yyyy", { locale: pt });
}

function formatPrice(price) {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { student, plan, end_date, price } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Seja bem-vindo a família Gympoint!!!',
      template: 'enrollment',
      context: {
        student: student.name,
        plan: plan.title,
        end_date: formatDate(end_date),
        price: formatPrice(price),
      },
    });
  }
}

export default new EnrollmentMail();
