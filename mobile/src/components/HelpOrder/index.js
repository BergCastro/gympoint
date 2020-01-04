import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import {
  Container,
  StatusText,
  Time,
  HeaderContainer,
  StatusIcon,
  Status,
  Question,
} from './styles';

export default function HelpOrder({ data, handleShowHelpOrder }) {
  // função que retorna o offset no formato adequado ex.: -03:00
  const d = new Date();
  const signOffSet = Math.sign(d.getTimezoneOffset()) * -1;
  const offset = `${signOffSet === -1 ? '-' : '+'}0${Math.abs(
    d.getTimezoneOffset()
  ) / 60}:00`;

  // console.tron.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
  // utcToZonedTime não está funcionando com timezone devido problemas com Intl
  const dateParsed = useMemo(() => {
    return formatRelative(utcToZonedTime(data.created_at, offset), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.created_at, offset]);

  return (
    <Container onPress={() => handleShowHelpOrder(data)}>
      <HeaderContainer>
        <Status>
          <StatusIcon name="check-circle" size={20} answered={data.answer} />
          <StatusText answered={data.answer}>
            {data.answer ? 'Respondido' : 'Sem resposta'}
          </StatusText>
        </Status>
        <Time>{dateParsed}</Time>
      </HeaderContainer>
      <Question>{data.question}</Question>
    </Container>
  );
}

HelpOrder.propTypes = {
  data: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
  handleShowHelpOrder: PropTypes.func.isRequired,
};
