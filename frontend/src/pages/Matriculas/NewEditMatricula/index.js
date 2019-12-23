import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Form, Input, Select } from '@rocketseat/unform';
import { Link, useHistory } from 'react-router-dom';
import { Container, ButtonSalvar, ButtonVoltar } from './styles';
import {
  updateMatriculaRequest,
  createMatriculaRequest,
} from '~/store/modules/matricula/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import DatePicker from '~/components/ReactDatePicker';
import api from '~/services/api';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default function NewEditMatricula() {
  const currentMatricula = useSelector(
    state => state.matricula.currentMatricula
  );

  const [students, setStudents] = useState([]);
  const [planos, setPlanos] = useState([]);
  const { action } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadAll() {
      const responseStudents = await api.get('students');
      const responsePlanos = await api.get('packages');
      console.log('students', responseStudents);
      setStudents(responseStudents.data);
      setPlanos(responsePlanos.data);
    }

    loadAll();
  }, []);

  function dateFormatted(date) {
    return new Date(date);
  }

  function handleSubmit(matricula) {
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
    plan_id: Yup.number()
      .integer()
      .required(),
    student_id: Yup.number()
      .integer()
      .required(),
  });

  function handleProgress(progress, event) {}

  function handleBack() {
    history.push('/matriculas');
  }

  const studentsAdapted = students.map(student => {
    return { ...student, title: student.name };
  });

  function handleChangePlan(event) {
    // currentMatricula.plan.id = event.target.value;
    // const planSelected = planos.filter(plan => plan.id == event.target.value);
    // console.log(planSelected);
  }

  return (
    <Container>
      <Form
        initialData={currentMatricula}
        onSubmit={handleSubmit}
        schema={schema}
        autoComplete="off"
      >
        <header>
          <strong>
            {action === 'novo' ? 'Cadastro' : 'Edição'} de matricula
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
            value={currentMatricula.student && currentMatricula.student.id}
          />

          <div>
            <div className="normal">
              <label>PLANO</label>
              <Select
                className="normal"
                name="plan_id"
                options={planos}
                value={currentMatricula.plan && currentMatricula.plan.id}
                onChange={event => handleChangePlan(event)}
              />
            </div>
            <div>
              <label>DATA DE INÍCIO</label>
              <DatePicker name="start_date" />
            </div>
            <div className="normal">
              <label>DATA DE TÉRMINO</label>
              <Input name="end_date" className="disabled normal" disabled />
            </div>
            <div className="normal">
              <label>VALOR FINAL</label>
              <Input name="price" className="disabled normal" disabled />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}
