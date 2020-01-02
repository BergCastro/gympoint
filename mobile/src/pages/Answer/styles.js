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
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const QuestionContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

export const HeaderText = styled.Text`
  flex-direction: row;
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const Question = styled.Text`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  text-align: left;
  line-height: 26px;
`;

export const AnswerContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const HeaderTextAnswer = styled.Text`
  flex-direction: row;
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const AnswerText = styled.Text`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  text-align: left;
  line-height: 26px;
`;
