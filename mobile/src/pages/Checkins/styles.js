import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
  padding: 20px;
  flex: 1;
`;

export const NewCheckinButton = styled(Button)`
  margin-top: 5px;
  margin-bottom: 25px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
