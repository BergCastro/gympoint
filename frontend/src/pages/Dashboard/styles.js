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
  div {
    background: #fff;
    margin-top: 24px;
    ul {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      button {
        background: none;
        border: 0;
      }
    }
  }
`;

export const Meetup = styled.li`
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
