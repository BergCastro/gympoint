import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  height: 448px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
  display: flex;
  flex-direction: column;

  img {
    align-self: center;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      align-self: flex-start;
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 5px;
      color: #444;
    }

    input {
      background: #fff;
      border: 1px solid;
      border-color: #ddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #444;
      margin: 0 0 10px;
      font-size: 16px;

      &::placeholder {
        color: #999;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 45px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#EE4D64')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
