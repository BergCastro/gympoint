import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { set } from 'date-fns';
import logo from '../../assets/logo2.png';

import api from '~/services/api';

import Background from '~/components/Background';
import Checkin from '~/components/Checkin';

import {
  Container,
  List,
  NewCheckinButton,
  ImageLogo,
  ContainerImage,
} from './styles';

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

  console.log('chackins', checkins);

  async function handleNewCheckin() {
    const response = await api.post(`students/${student.id}/checkins`);
    setCheckins([...checkins, response.data]);
    console.tron.log('response', response.data);
  }

  return (
    <Background>
      <ContainerImage>
        <ImageLogo source={logo} />
      </ContainerImage>
      <Container>
        <NewCheckinButton onPress={handleNewCheckin}>
          Novo check-in
        </NewCheckinButton>

        {checkins.length > 0 && (
          <List
            data={checkins}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Checkin data={item} />}
          />
        )}
      </Container>
    </Background>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Checkins);
