import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';

import Background from '~/components/Background';
import HeaderLogo from '~/components/HeaderLogo';

import {
  Container,
  HelpOrderContainer,
  HeaderContainer,
  Question,
  HeaderText,
  QuestionContainer,
  Time,
  HeaderTextAnswer,
  AnswerText,
  AnswerContainer,
} from './styles';

function Answer({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  const d = new Date();
  const signOffSet = Math.sign(d.getTimezoneOffset()) * -1;
  const offset = `${signOffSet === -1 ? '-' : '+'}0${Math.abs(
    d.getTimezoneOffset()
  ) / 60}:00`;

  const dateParsed = useMemo(() => {
    return formatRelative(
      utcToZonedTime(helpOrder.created_at, offset),
      new Date(),
      {
        locale: pt,
        addSuffix: true,
      }
    );
  }, [helpOrder.created_at, offset]);

  return (
    <Background>
      <HeaderLogo />
      <Container>
        <HelpOrderContainer>
          <QuestionContainer>
            <HeaderContainer>
              <HeaderText>PERGUNTA</HeaderText>
              <Time>{dateParsed}</Time>
            </HeaderContainer>
            <Question>{helpOrder.question}</Question>
          </QuestionContainer>
          <AnswerContainer>
            <HeaderTextAnswer>RESPOSTA</HeaderTextAnswer>
            <AnswerText>{helpOrder.answer}</AnswerText>
          </AnswerContainer>
        </HelpOrderContainer>
      </Container>
    </Background>
  );
}

function NavIcon({ tintColor }) {
  return <Icon name="edit-location" size={20} color={tintColor} />;
}

Answer.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: NavIcon,
};

export default withNavigationFocus(Answer);

Answer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func,
  }).isRequired,
};

NavIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
