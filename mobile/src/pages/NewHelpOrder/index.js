import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import api from '~/services/api';
import Button from '~/components/Button';

import Background from '~/components/Background';
import HeaderLogo from '~/components/HeaderLogo';

import { Container, Question } from './styles';

function NewHelpOrder({ navigation }) {
  const student = useSelector(state => state.signin.currentStudent);
  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    try {
      await api.post(`students/${student.id}/help-orders`, {
        question,
      });
      Alert.alert('Sucesso!', 'Pedido enviado com sucesso.');
      navigation.navigate('HelpOrders');
    } catch (error) {
      console.tron.log(error.response.status);
    }
  }

  return (
    <Background>
      <HeaderLogo />
      <Container>
        <Container>
          <Question
            multiline
            placeholder="Inclua seu pedido de auxílio"
            numberOfLines={10}
            textAlignVertical="top"
            value={question}
            onChangeText={setQuestion}
          />
          <Button onPress={handleSubmit}>Enviar pedido</Button>
        </Container>
      </Container>
    </Background>
  );
}

function NavIcon({ tintColor }) {
  return <Icon name="edit-location" size={20} color={tintColor} />;
}

NewHelpOrder.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: NavIcon,
};

export default withNavigationFocus(NewHelpOrder);

NewHelpOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

NavIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
