import React, { useMemo } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import logo from '../../assets/logo2.png';

import Background from '~/components/Background';

import {
  Container,
  ImageLogo,
  ContainerImage,
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
  // useEffect(() => {
  //   async function loadAnswer() {
  //     const response = await api.get(`students/${student.id}/help-orders`);

  //     setAnswer(response.data.answer);
  //     console.tron.log(response.data.answer);
  //   }
  //   if (isFocused) {
  //     loadAnswer();
  //   }
  // }, [isFocused, student.id]);

  // async function handleNewHelpOrder() {
  //   try {
  //     const response = await api.post(`students/${student.id}/help-orders`);
  //     setAnswer([...answer, response.data]);
  //   } catch (error) {
  //     console.tron.log(error.response.status);
  //     if (error.response.status === 403) {
  //       Alert.alert(
  //         'HelpOrder não permitido',
  //         'Você já possui 5 chekins nos últimos 7 dias'
  //       );
  //     } else {
  //       Alert.alert('Ocorreu um erro', 'Tente novamente');
  //     }
  //   }
  // }

  // const answerSorted = answer.sort(sortBy('-created_at'));

  // function handleShowHelpOrder(helpOrder) {
  //   navigation.navigate('Answer', { helpOrder });
  // }

  return (
    <Background>
      <ContainerImage>
        <ImageLogo source={logo} />
      </ContainerImage>
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

Answer.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Answer);
