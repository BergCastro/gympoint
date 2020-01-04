import styled from 'styled-components/native';
import Input from '~/components/Input';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
  flex: 1;
  padding: 10px;
`;

export const Question = styled(Input)`
  background: #fff;
  margin-bottom: 20px;
  height: auto;
`;
