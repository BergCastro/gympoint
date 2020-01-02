import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
  padding: 20px;
  flex: 1;
`;

export const ContainerImage = styled.View`
  align-self: center;
  background: #fff;
  height: 40px;
  padding: 10px;
`;

export const ImageLogo = styled.Image``;

export const HelpOrderContainer = styled.View`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
  height: 150px;
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Status = styled.View`
  flex-direction: row;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Question = styled.Text`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  text-align: left;
  line-height: 26px;
`;
