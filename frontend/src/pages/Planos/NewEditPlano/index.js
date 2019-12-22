import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Form, Input, FileInput } from '@rocketseat/unform';
import { Link, useHistory } from 'react-router-dom';
import { Container, ButtonSalvar, ButtonVoltar } from './styles';
import {
  updatePlanoRequest,
  createPlanoRequest,
} from '~/store/modules/plano/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

export default function NewEditPlano() {
  const currentPlano = useSelector(state => state.plano.currentPlano);
  const { action } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  function handleSubmit(plano) {
    if (action === 'editar') {
      dispatch(
        updatePlanoRequest({
          ...plano,
          id: currentPlano.id,
        })
      );
    } else {
      dispatch(createPlanoRequest({ ...plano }));
    }
  }

  const schema = Yup.object().shape({
    title: Yup.string().required('Um nome é requerido'),
    duration: Yup.number().required('Número de meses válido é requerido'),
    price: Yup.number('Preço precisa ser um número!').required(
      'Um preço válido requerido'
    ),
  });

  function handleProgress(progress, event) {}

  function handleBack() {
    history.push('/planos');
  }

  return (
    <Container>
      <Form
        initialData={currentPlano}
        onSubmit={handleSubmit}
        schema={schema}
        autoComplete="off"
      >
        <header>
          <strong>{action === 'novo' ? 'Cadastro' : 'Edição'} de plano</strong>
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
          <label>TÍTULO DO PLANO</label>
          <Input name="title" placeholder="Nome do Plano" />

          <div>
            <div>
              <label>DURAÇÃO</label>
              <Input name="duration" placeholder="Duração do Plano" />
            </div>
            <div>
              <label>PREÇO</label>
              <Input name="price" placeholder="Preço Mensal" />
            </div>
            <div>
              <label>PREÇO TOTAL</label>
              <Input name="total_price" />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}
