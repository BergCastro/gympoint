import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Alunos from '../pages/Alunos';
import Detalhes from '../pages/Detalhes';
import Profile from '../pages/Profile';
import NovoAluno from '../pages/NovoAluno';
import EditAluno from '../pages/Alunos/EditAluno';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/alunos" component={Alunos} isPrivate />
      <Route path="/editAluno" component={EditAluno} isPrivate />
      <Route path="/newAluno" component={NovoAluno} isPrivate />
      <Route path="/detalhes" component={Detalhes} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
