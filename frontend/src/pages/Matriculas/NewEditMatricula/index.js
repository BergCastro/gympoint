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
import api from '~/services/api';

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
          <label>Aluno</label>
          <Select name="student_id" options={students} />

          <div>
            <div>
              <label>PLANO</label>
              <Select name="plan_id" options={planos} />
            </div>
            <div>
              <label>DATA DE INÍCIO</label>
              <Input name="start_date" placeholder="Data de Início" />
            </div>
            <div>
              <label>DATA DE TÉRMINO</label>
              <Input name="end_date" />
            </div>
            <div>
              <label>VALOR FINAL</label>
              <Input name="total_amount" />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}
