import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';
import logoGympoint from '~/assets/logo-gympoint.svg';
import { Container, Content, Profile } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <img id="name" src={logoGympoint} alt="Gympoint" />
          <Link to="/alunos">ALUNOS</Link>
          <Link to="/planos">PLANOS</Link>
          <Link to="/matriculas">MATRÍCULAS</Link>
          <Link to="/pedidos">PEDIDOS DE AUXÍLIO</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={() => handleLogout()}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
