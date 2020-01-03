import styled from 'styled-components/native';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
  flex: 1;
  padding: 10px;
`;

export const ContainerImage = styled.View`
  align-self: center;
  background: #fff;
  height: 40px;
  padding: 10px;
`;

export const ImageLogo = styled.Image``;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Question = styled(Input)`
  background: #fff;
  margin-bottom: 20px;
  height: auto;
`;
