import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import {
  updatePlanoRequest,
  createPlanoRequest,
} from '~/store/modules/plano/actions';
import {
  Container,
  InputContainer,
  ButtonSalvar,
  ButtonVoltar,
} from './styles';

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
        <div id="body-form">
          <Input
            name="title"
            label="TÍTULO DO PLANO"
            placeholder="Nome do Plano"
          />
          <div id="grid">
            <InputContainer>
              <Input
                name="duration"
                label="DURAÇÂO"
                placeholder="Duração do Plano"
              />
            </InputContainer>
            <InputContainer>
              <Input name="price" label="PREÇO" placeholder="Preço Mensal" />
            </InputContainer>
            <InputContainer>
              <Input name="total_price" label="PREÇO TOTAL" />
            </InputContainer>
          </div>
        </div>
      </Form>
    </Container>
  );
}
