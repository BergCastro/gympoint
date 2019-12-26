import React, { useState, useMemo } from 'react';
// import { useParams } from 'react-router';
import { Form, Input, Select } from '@rocketseat/unform';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { format, parseISO, addMonths, isValid, parse } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Container, ButtonSalvar, ButtonVoltar } from './styles';
import {
  updateMatriculaRequest,
  createMatriculaRequest,
} from '~/store/modules/matricula/actions';
import DatePicker from '~/components/ReactDatePicker';

export default function NewEditMatricula() {
  const planos = useSelector(state => state.matricula.plans);
  const students = useSelector(state => state.matricula.students);
  const currentMatricula = useSelector(
    state => state.matricula.currentMatricula
  );

  const [matricula, setMatricula] = useState(currentMatricula);

  const { action } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  function formatDate(date) {
    if (isValid(date)) {
      return format(date, 'dd/MM/yyyy');
    }
    const nowDate = new Date();
    return `${nowDate.getDate()}/${nowDate.getMonth() +
      1}/${nowDate.getFullYear()}`;
  }
  const endDate = useMemo(() => {
    console.log('endDate', matricula.start_date);
    return addMonths(
      parseISO(formatDate(matricula.start_date)),
      matricula.plan.duration
    );
  }, [matricula]);

  const price = useMemo(
    () => `R$ ${matricula.plan.price * matricula.plan.duration},00`,
    [matricula]
  );

  function handleSubmit(matricula) {
    console.log('matricula', matricula);
    if (action === 'editar') {
      dispatch(
        updateMatriculaRequest({
          ...matricula,
          id: currentMatricula.id,
        })
      );
    } else {
      dispatch(createMatriculaRequest({ ...matricula }));
    }
  }

  const schema = Yup.object().shape({
    start_date: Yup.date().required(),
    plan_id: Yup.number('Um plano precisa ser selecionado')
      .integer('Um plano precisa ser selecionado')
      .required('Um plano precisa ser selecionado'),
    student_id: Yup.number('Um aluno precisa ser selecionado')
      .integer('Um aluno precisa ser selecionado')
      .required('Um aluno precisa ser selecionado'),
  });

  function handleBack() {
    history.push('/matriculas');
  }

  function handleChangePlan(event) {
    const plano = planos.find(plan => plan.id == event.target.value);
    setMatricula({ ...matricula, plan: plano });
  }

  function handleChangeStartDate(date) {
    const dateFormated = new Date(date);

    setMatricula({
      ...matricula,
      start_date: `${dateFormated.getUTCFullYear()}-${dateFormated.getUTCMonth() +
        1}-${dateFormated.getUTCDate()}`,
    });
  }

  const studentsAdapted = students.map(student => {
    return { ...student, title: student.name };
  });

  return (
    <Container>
      <Form
        initialData={matricula}
        onSubmit={handleSubmit}
        schema={schema}
        autoComplete="off"
      >
        <header>
          <strong>
            {action === 'novo' ? 'Cadastro' : 'Edição'} de matrícula
          </strong>
          <div>
            <ButtonVoltar type="button" onClick={handleBack}>
              <MdKeyboardArrowLeft id="btVoltar" size={20} color="#fff" />
              VOLTAR
            </ButtonVoltar>
            <ButtonSalvar type="submit">
              <MdDone id="btSalvar" size={20} color="#fff" />
              SALVAR
            </ButtonSalvar>
          </div>
        </header>
        <div className="content">
          <label>ALUNO</label>
          <Select
            name="student_id"
            options={studentsAdapted}
            // value={currentMatricula.student_id}
          />

          <div>
            <div className="normal">
              <label>PLANO</label>
              <Select
                className="normal"
                name="plan_id"
                options={planos}
                // value={currentMatricula.plan_id}
                // value={plano}
                onBlur={event => handleChangePlan(event)}
              />
            </div>
            <div>
              <label>DATA DE INÍCIO</label>
              <DatePicker
                name="start_date"
                handleChangeStartDate={handleChangeStartDate}
              />
            </div>
            <div className="normal">
              <label>DATA DE TÉRMINO</label>
              <input
                name="end_date"
                className="disabled normal"
                value={endDate}
                disabled
              />
            </div>
            <div className="normal">
              <label>VALOR FINAL</label>
              <input
                name="price"
                className="disabled normal"
                value={price}
                disabled
              />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}
