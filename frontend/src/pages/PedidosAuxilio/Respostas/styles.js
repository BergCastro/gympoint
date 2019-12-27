import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 450px;
  height: 425px;
  border-radius: 4px;
  background: #fff;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Body = styled.div`
  padding: 10px;
  form {
    display: flex;
    flex-direction: column;

    label {
      font-size: 14px;
      font-weight: bold;
      color: #444;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    textarea#question {
      background: #fff;
      border: none;

      width: 100%;

      color: #666;

      font-size: 16px;
      overflow: hidden;
    }

    textarea#answer {
      background: #fff;
      border: 1px solid;
      border-color: #ddd;
      border-radius: 4px;
      height: 127px;
      width: 100%;
      padding: 10px;
      color: #999;
      margin: 0 0 10px;
      font-size: 16px;

      &::placeholder {
        color: #999;
      }
    }
  }
`;

export const ButtonClose = styled.button`
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  color: #444;
`;

export const ButtonAnswer = styled.button`
  border: 0;
  background: #ee4d64;
  margin-top: 10px;
  height: 45px;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background: ${darken(0.08, '#ee4d64')};
  }
`;
