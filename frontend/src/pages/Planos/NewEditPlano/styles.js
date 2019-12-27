import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 30px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    strong {
      color: #444;
      font-size: 24px;
    }
    div{
      display: flex;
      flex-direction: row;
    button {

    }
    }
  }

  form {
    display: flex;
    flex-direction: column;


  div.content {
    display: flex;
    padding: 20px;
    flex-direction: column;
    background: #fff;
    margin-top: 24px;



    label {
      font-size: 14px;
      font-weight: bold;
      color: #444;
    }

    input {
      background: #fff;
      border: 1px solid;
      border-color: #ddd
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
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      div {
        display: flex;
      flex-direction: column;
      }
    }
  }
  }


`;

export const ButtonSalvar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: #ee4d64;
  width: 112px;
  height: 36px;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background: ${darken(0.08, '#ee4d64')};
  }

  #btNovo {
    margin-right: 10px;
  }
`;

export const ButtonVoltar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  border: 0;
  background: #ccc;
  width: 112px;
  height: 36px;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background: ${darken(0.08, '#ccc')};
  }

  #btNovo {
    margin-right: 10px;
  }
`;
