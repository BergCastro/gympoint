import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 45px;
      height: 24px;
      margin-right: 10px;
    }
    img#name {
      width: 77px;
      height: 24px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #ddd;
    }

    .active {
      color: ${darken(0.2, '#999')};
    }

    a {
      font-weight: bold;
      color: #999;
      font-size: 15px;
      margin-right: 20px;
      &:hover {
        color: ${darken(0.08, '#999')};
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  div {
    text-align: right;
    margin-right: 10px;
    font-size: 14px;
    strong {
      display: block;
      color: #666;
    }
    button {
      display: block;
      margin-top: 2px;
      background: none;
      border: none;

      color: #de3b3b;
    }
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
