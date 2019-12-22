import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Form, Input, FileInput } from '@rocketseat/unform';
import { Link, useHistory } from 'react-router-dom';
import { Container, ButtonSalvar, ButtonVoltar } from './styles';
import {
  updateAlunoRequest,
  createAlunoRequest,
} from '~/store/modules/aluno/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

export default function NewEditAluno() {
  const currentAluno = useSelector(state => state.aluno.currentAluno);
  const { action } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  function handleSubmit(aluno) {
    if (action === 'editar') {
      dispatch(
        updateAlunoRequest({
          ...aluno,
          id: currentAluno.id,
        })
      );
    } else {
      dispatch(createAlunoRequest({ ...aluno }));
    }
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('Um nome é requerido'),
    email: Yup.string()
      .email('Um email válido é requerido')
      .required('Um email válido é requerido'),
    idade: Yup.number('A idade precisa ser um número!').required(
      'Uma data válida é requerida'
    ),
    peso: Yup.number('O peso precisa ser um número').required(
      'Uma data válida é requerida'
    ),
    altura: Yup.number()
      .positive('O valor precisa ser positivo')
      .max(3, 'O valor máximo é 3')
      .required('Uma altura válida é requerida'),
  });

  function handleProgress(progress, event) {}

  function handleBack() {
    history.push('/alunos');
  }

  return (
    <Container>
      <Form
        initialData={currentAluno}
        onSubmit={handleSubmit}
        schema={schema}
        autoComplete="off"
      >
        <header>
          <strong>{action === 'novo' ? 'Cadastro' : 'Edição'} de aluno</strong>
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
          <label>NOME COMPLETO</label>
          <Input name="name" placeholder="Nome do Aluno" />
          <label>EMAIL</label>
          <Input name="email" placeholder="Email do Aluno" />
          <div>
            <div>
              <label>IDADE</label>
              <Input name="idade" placeholder="Idade do aluno" />
            </div>
            <div>
              <label>PESO(kg)</label>
              <Input name="peso" placeholder="Peso do aluno" />
            </div>
            <div>
              <label>ALTURA(m)</label>
              <Input name="altura" placeholder="Altura do aluno" />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}
