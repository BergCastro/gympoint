import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import sortBy from 'sort-by';
import { Alert } from 'react-native';
import logo from '../../assets/logo2.png';
import api from '~/services/api';
import HelpOrder from '~/components/HelpOrder';

import Background from '~/components/Background';

import {
  Container,
  List,
  NewHelpOrderButton,
  ImageLogo,
  ContainerImage,
} from './styles';

function HelpOrders({ isFocused, navigation }) {
  const student = useSelector(state => state.signin.currentStudent);
  const [helporders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`students/${student.id}/help-orders`);

      setHelpOrders(response.data.helporders);
      console.tron.log(response.data.helporders);
    }
    if (isFocused) {
      loadHelpOrders();
    }
  }, [isFocused, student.id]);

  async function handleNewHelpOrder() {
    navigation.navigate('NewHelpOrder');
  }

  const helpordersSorted = helporders.sort(sortBy('-created_at'));

  function handleShowHelpOrder(helpOrder) {
    navigation.navigate('Answer', { helpOrder });
  }

  return (
    <Background>
      <ContainerImage>
        <ImageLogo source={logo} />
      </ContainerImage>
      <Container>
        <NewHelpOrderButton onPress={handleNewHelpOrder}>
          Novo pedido de auxílio
        </NewHelpOrderButton>

        {helporders.length > 0 && (
          <List
            data={helpordersSorted}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <HelpOrder
                handleShowHelpOrder={handleShowHelpOrder}
                data={item}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

HelpOrders.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(HelpOrders);
