import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import sortBy from 'sort-by';
import api from '~/services/api';
import HelpOrder from '~/components/HelpOrder';

import Background from '~/components/Background';
import HeaderLogo from '~/components/HeaderLogo';

import { Container, List, NewHelpOrderButton } from './styles';

function HelpOrders({ isFocused, navigation }) {
  const student = useSelector(state => state.signin.currentStudent);
  const [helporders, setHelpOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function loadHelpOrders() {
    const response = await api.get(`students/${student.id}/help-orders`);

    setHelpOrders(response.data.helporders);
    console.tron.log(response.data.helporders);
    setRefreshing(false);
  }

  function refreshList() {
    setRefreshing(true);
    loadHelpOrders();
  }

  useEffect(() => {
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
      <HeaderLogo />
      <Container>
        <NewHelpOrderButton onPress={handleNewHelpOrder}>
          Novo pedido de auxílio
        </NewHelpOrderButton>

        {helporders.length > 0 && (
          <List
            data={helpordersSorted}
            keyExtractor={item => String(item.id)}
            onRefresh={refreshList}
            refreshing={refreshing}
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

function NavIcon({ tintColor }) {
  return <Icon name="edit-location" size={20} color={tintColor} />;
}

HelpOrders.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: NavIcon,
};

export default withNavigationFocus(HelpOrders);

HelpOrders.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

NavIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
