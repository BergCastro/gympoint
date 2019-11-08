import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { Form, Input, FileInput } from '@rocketseat/unform';
import { Link, useHistory } from 'react-router-dom';
import { MdCreate, MdDeleteForever, MdEvent, MdRoom } from 'react-icons/md';
import api from '~/services/api';
import DatePicker from '~/components/ReactDatePicker';
import { Container } from './styles';
import { updateAlunoRequest } from '~/store/modules/aluno/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

export default function EditAluno() {
  const currentAluno = useSelector(state => state.aluno.currentAluno);

  const history = useHistory();
  const dispatch = useDispatch();

  function handleSubmit(aluno) {
    dispatch(
      updateAlunoRequest({
        ...aluno,
        id: currentAluno.id,
      })
    );
  }

  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().required('Um título é requerido'),
    idade: Yup.number().required('Uma data válida é requerida'),
    peso: Yup.number().required('Uma data válida é requerida'),
    altura: Yup.number().required('Uma data válida é requerida'),
  });

  function handleProgress(progress, event) {}
  return (
    <Container>
      <header>
        <strong>Cadastro de Alunos</strong>
        <button type="button">
          <MdKeyboardArrowLeft id="btVoltar" size={20} color="#fff" />
          VOLTAR
        </button>
        <button type="button">
          <MdDone id="btSalvar" size={20} color="#fff" />
          SALVAR
        </button>
      </header>
      <div className="content">
        <Form
          initialData={currentAluno}
          onSubmit={handleSubmit}
          schema={schema}
          autoComplete="off"
        >
          <label>NOME COMPLETO</label>
          <Input name="name" placeholder="Nome do Aluno" />
          <label>EMAIL</label>
          <Input name="email" placeholder="Nome do Aluno" />
          <div>
            <div>
              <label>IDADE</label>
              <Input name="idade" placeholder="Data do aluno" />
            </div>
            <div>
              <label>PESO</label>
              <Input name="peso" placeholder="Data do aluno" />
            </div>
            <div>
              <label>ALTURA</label>
              <Input name="altura" placeholder="Data do aluno" />
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
}
