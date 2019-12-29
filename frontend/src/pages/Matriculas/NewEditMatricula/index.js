import React, { useState, useMemo } from 'react';
import { Form, Select } from '@rocketseat/unform';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { format, addMonths } from 'date-fns';
import { Container, ButtonSalvar, ButtonVoltar } from './styles';
import {
  updateMatriculaRequest,
  createMatriculaRequest,
} from '~/store/modules/matricula/actions';
import DatePicker from '~/components/ReactDatePicker';
import ReactSelect from '~/components/ReactSelect';

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

  const endDate = useMemo(() => {
    return format(
      addMonths(new Date(matricula.start_date), matricula.plan.duration),
      'dd/MM/yyyy'
    );
  }, [matricula]);

  const price = useMemo(() => {
    const total = matricula.plan.price * matricula.plan.duration;
    return total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }, [matricula]);

  function handleSubmit(matriculaSelected) {
    if (action === 'editar') {
      dispatch(
        updateMatriculaRequest({
          ...matriculaSelected,
          id: currentMatricula.id,
        })
      );
    } else {
      dispatch(createMatriculaRequest({ ...matriculaSelected }));
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
    const plano = planos.find(
      plan => plan.id === parseInt(event.target.value, 10)
    );
    setMatricula({ ...matricula, plan: plano });
  }

  function handleChangeStartDate(date) {
    setMatricula({
      ...matricula,
      start_date: new Date(date),
    });
  }

  const studentsAdapted = students.map(student => {
    return { ...student, title: student.name };
  });

  return (
    <>
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
          <div id="form-body">
            <ReactSelect
              name="student_id"
              label="ALUNO"
              options={studentsAdapted}
              placeholder="Buscar aluno"
              multiple={false}
            />
            <div id="grid">
              <div id="input">
                <Select
                  name="plan_id"
                  label="PLANO"
                  options={planos}
                  onChange={event => handleChangePlan(event)}
                />
              </div>
              <div id="input">
                <label>DATA DE INÍCIO</label>

                <DatePicker
                  name="start_date"
                  handleChangeStartDate={handleChangeStartDate}
                />
              </div>
              <div id="input">
                <label>DATA DE TÉRMINO</label>
                <input
                  name="end_date"
                  className="disabled normal"
                  value={endDate}
                  disabled
                />
              </div>
              <div id="input">
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
    </>
  );
}
