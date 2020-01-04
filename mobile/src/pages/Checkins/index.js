import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import sortBy from 'sort-by';
import { Alert } from 'react-native';
import api from '~/services/api';

import Background from '~/components/Background';
import Checkin from '~/components/Checkin';
import HeaderLogo from '~/components/HeaderLogo';

import { Container, List, NewCheckinButton } from './styles';

function Checkins({ isFocused }) {
  const student = useSelector(state => state.signin.currentStudent);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`students/${student.id}/checkins`);

      setCheckins(response.data.checkins);
    }
    if (isFocused) {
      loadCheckins();
    }
  }, [isFocused, student.id]);

  async function handleNewCheckin() {
    try {
      const response = await api.post(`students/${student.id}/checkins`);
      setCheckins([...checkins, response.data]);
    } catch (error) {
      console.tron.log(error.response.status);
      if (error.response.status === 403) {
        Alert.alert(
          'Checkin não permitido',
          'Você já possui 5 checkins nos últimos 7 dias'
        );
      } else {
        Alert.alert('Ocorreu um erro', 'Tente novamente');
      }
    }
  }

  const checkinsSorted = checkins.sort(sortBy('-created_at'));

  return (
    <Background>
      <HeaderLogo />
      <Container>
        <NewCheckinButton onPress={handleNewCheckin}>
          Novo check-in
        </NewCheckinButton>

        {checkins.length > 0 && (
          <List
            data={checkinsSorted}
            keyExtractor={item => String(item.id)}
            renderItem={({ index, item }) => (
              <Checkin data={item} index={checkins.length - index} />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

function NavIcon({ tintColor }) {
  return <Icon name="edit-location" size={20} color={tintColor} />;
}

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: NavIcon,
};

Checkins.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

NavIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default withNavigationFocus(Checkins);
