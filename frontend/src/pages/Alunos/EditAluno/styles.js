import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

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
    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border: 0;
      background: #ee4d64;
      width: 142px;
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
    }
  }

  div.content {
    display: flex;
    padding: 20px;
    flex-direction: column;
    background: #fff;
    margin-top: 24px;

    form {
    display: flex;
    flex-direction: column;

    margin-top: 20px;

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




    input.password {
      -webkit-text-security: disc;
    }



    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    button#btnUpdate {
      margin: 5px 0 0;
      height: 42px;
      width: 162px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      align-self: flex-end;

      &:hover {
        background: ${darken(0.03, '#F94D6A')};
      }
    }
  }


  img {
    margin-top: 52px;
    height: 300px;
  }

  p {
    margin-top: 30px;
    color: #fff;
    font-size: 18px;
  }

  footer {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    color: #999;
    font-size: 16px;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 30px;
      span {
        margin-right: 10px;
      }
    }
  }
`;

export const Aluno = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
  border: 0;
  border-radius: 4px;
  height: 62px;
  color: #fff;
  margin: 0 0 10px;

  strong {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }

  span {
    color: #999;
    font-size: 16px;
    font-weight: normal;
  }
`;
