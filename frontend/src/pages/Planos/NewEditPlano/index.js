import React, { useMemo, useState } from 'react';
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

  const [plano, setPlano] = useState(currentPlano);

  const priceTotal = useMemo(() => {
    const total = plano.price * plano.duration;
    return total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }, [plano]);

  function handleSubmit(planoSubmited) {
    if (action === 'editar') {
      dispatch(
        updatePlanoRequest({
          ...planoSubmited,
          id: currentPlano.id,
        })
      );
    } else {
      dispatch(createPlanoRequest({ ...planoSubmited }));
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

  function handleChangePrice(event) {
    setPlano({ ...plano, price: event.target.value });
  }

  function handleChangeDuration(event) {
    setPlano({ ...plano, duration: event.target.value });
  }

  return (
    <Container>
      <Form
        initialData={plano}
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
                label="DURAÇÃO(em meses)"
                placeholder="Duração do Plano"
                onChange={handleChangeDuration}
              />
            </InputContainer>
            <InputContainer>
              <Input
                name="price"
                label="PREÇO MENSAL"
                placeholder="Preço Mensal"
                onChange={handleChangePrice}
              />
            </InputContainer>
            <InputContainer>
              <label>PREÇO TOTAL</label>
              <input
                className="disabled"
                label="PREÇO TOTAL"
                value={priceTotal}
                disabled
              />
            </InputContainer>
          </div>
        </div>
      </Form>
    </Container>
  );
}
