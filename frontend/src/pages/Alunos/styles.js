import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
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

    input {
      background: #fff;
      border: 1px solid;
      border-color: #ddd
      border-radius: 4px;
      height: 36px;
      width: 237px;
      padding: 0 10px;
      color: #444;
      font-size: 16px;

      &::placeholder {
        color: #999;
      }


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
      margin-right: 16px;

      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }

      #btNovo {
        margin-right: 10px;
      }
    }

    div{
      background: #F2F2F2;
    }
  }
  div {
    display: flex;
    background: #fff;
    margin-top: 24px;

    table {
      margin: 20px;
      width: 100%;
      border-collapse: collapse;
      border-style: hidden;

      th {
        text-align: left;
        font-size: 16px;
        color: #444;
        font-weight: bold;
      }

      tr {
        height: 40px;
        font-size: 16px;
        color: #666;
        border-bottom: 0px solid #eee;
      }
      tr + tr {
        border-bottom: 1px solid #eee;
      }

      button + button {
        margin-left: 20px;
      }
    }
  }
`;

export const ButtonAction = styled.button`
  background: none;
  border: none;
  font-size: 15px;
`;
