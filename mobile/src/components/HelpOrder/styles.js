import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.TouchableOpacity`
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

export const StatusIcon = styled(Icon)`
  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const Status = styled.View`
  flex-direction: row;
`;

export const StatusText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
  margin-left: 8px;
  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Question = styled.Text.attrs({
  numberOfLines: 3,
})`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  text-align: left;
  line-height: 26px;
`;
