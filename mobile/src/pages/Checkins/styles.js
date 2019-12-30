import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
  padding: 20px;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #666;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const NewCheckinButton = styled(Button)`
  margin-top: 5px;
  margin-bottom: 25px;
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
