import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import Alunos from '../pages/Alunos';
import Planos from '../pages/Planos';
import Matriculas from '../pages/Matriculas';
import Pedidos from '../pages/PedidosAuxilio';
import NewEditAluno from '../pages/Alunos/NewEditAluno';
import NewEditPlano from '../pages/Planos/NewEditPlano';
import NewEditMatricula from '../pages/Matriculas/NewEditMatricula';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/pedidos" component={Pedidos} isPrivate />
      <Route path="/alunos" component={Alunos} isPrivate />
      <Route path="/aluno/:action" component={NewEditAluno} isPrivate />
      <Route path="/planos" component={Planos} isPrivate />
      <Route path="/plano/:action" component={NewEditPlano} isPrivate />
      <Route path="/matriculas" component={Matriculas} isPrivate />
      <Route path="/matricula/:action" component={NewEditMatricula} isPrivate />
    </Switch>
  );
}
