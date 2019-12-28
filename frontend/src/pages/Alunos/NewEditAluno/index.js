import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import InputMask from 'react-input-mask';
import {
  updateAlunoRequest,
  createAlunoRequest,
} from '~/store/modules/aluno/actions';
import { Container, ButtonSalvar, ButtonVoltar } from './styles';

export default function NewEditAluno() {
  const currentAluno = useSelector(state => state.aluno.currentAluno);
  const [peso, setPeso] = useState(currentAluno.peso || '');
  const [altura, setAltura] = useState(currentAluno.altura || '');
  const [idade, setIdade] = useState(currentAluno.idade || '');
  const { action } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  function handleSubmit(aluno) {
    if (action === 'editar') {
      dispatch(
        updateAlunoRequest({
          ...aluno,
          id: currentAluno.id,
          peso,
          altura,
          idade,
        })
      );
    } else {
      dispatch(createAlunoRequest({ ...aluno, peso, altura, idade }));
    }
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('Um nome é requerido'),
    email: Yup.string()
      .email('Um email válido é requerido')
      .required('Um email válido é requerido'),
  });

  function handleBack() {
    history.push('/alunos');
  }

  function handleChangePeso(event) {
    setPeso(event.target.value);
  }

  function handleChangeAltura(event) {
    setAltura(event.target.value);
  }

  function handleChangeIdade(event) {
    setIdade(event.target.value);
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
              <InputMask
                mask="999"
                name="idade"
                maskChar=" "
                value={idade}
                onChange={handleChangeIdade}
                placeholder="Idade do aluno"
              />
            </div>
            <div>
              <label>PESO(kg)</label>
              <InputMask
                mask="999"
                maskChar=" "
                name="peso"
                value={peso}
                onChange={handleChangePeso}
                placeholder="Peso do aluno"
              />
            </div>
            <div>
              <label>ALTURA(m)</label>

              <InputMask
                name="altura"
                mask="9.99"
                maskChar=" "
                value={altura}
                onChange={handleChangeAltura}
                placeholder="Altura do aluno"
              />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}
