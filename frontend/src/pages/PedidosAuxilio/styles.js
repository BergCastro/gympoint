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

      a + a {
        margin-left: 20px;
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
  background: #fff;
  border: 0;
  border-radius: 4px;
  height: 62px;
  color: #444;
  margin: 0 0 10px;

  strong {
    color: #444;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;

    color: #999;
    font-size: 16px;
    font-weight: normal;
    span {
      margin-right: 10px;
    }
  }
`;
