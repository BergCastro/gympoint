import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import logo from '../../assets/logo2.png';
import api from '~/services/api';
import Button from '~/components/Button';

import Background from '~/components/Background';

import { Container, ImageLogo, ContainerImage, Question } from './styles';

function NewHelpOrder({ navigation }) {
  const student = useSelector(state => state.signin.currentStudent);
  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    try {
      const response = await api.post(`students/${student.id}/help-orders`, {
        question,
      });
      navigation.navigate('HelpOrders');
    } catch (error) {
      console.tron.log(error.response.status);
    }
  }

  return (
    <Background>
      <ContainerImage>
        <ImageLogo source={logo} />
      </ContainerImage>
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

NewHelpOrder.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(NewHelpOrder);
