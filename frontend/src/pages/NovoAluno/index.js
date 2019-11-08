import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { Form, Input, FileInput } from '@rocketseat/unform';
import { Link, useHistory } from 'react-router-dom';
import { MdCreate, MdDeleteForever, MdEvent, MdRoom } from 'react-icons/md';
import api from '~/services/api';
import BannerInput from './BannerInput';
import DatePicker from '~/components/ReactDatePicker';
import { Container } from './styles';
import { createAlunoRequest } from '~/store/modules/aluno/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
export default function NovoAluno() {
  const currentAluno = useSelector(state => state.aluno.currentAluno);

  // const aluno = {
  //   ...currentAluno,
  //   date: parseISO(currentAluno.date),
  // };
  const history = useHistory();
  const dispatch = useDispatch();

  function handleSubmit(aluno) {
    dispatch(createAlunoRequest(aluno));
  }

  const schema = Yup.object().shape({
    file_id: Yup.number(),
    title: Yup.string().required('Um título é requerido'),
    date: Yup.date().required('Uma data válida é requerida'),
    location: Yup.string().required('Uma localização é requerida'),
    description: Yup.string().required('Uma descrição é requerida'),
  });

  function handleProgress(progress, event) {}
  return (
    <Container>
      <Form
        initialData={currentAluno}
        onSubmit={handleSubmit}
        schema={schema}
        autocomplete="off"
      >
        <BannerInput name="file_id" />

        <Input name="title" placeholder="Título do Aluno" />
        <Input multiline name="description" placeholder="Descricao completa" />
        {/* <Input name="date" placeholder="Data do aluno" /> */}
        <DatePicker name="date" />
        <Input name="location" placeholder="Localização" />

        <button id="btnUpdate" type="submit">
          Salvar aluno
        </button>
      </Form>
    </Container>
  );
}
