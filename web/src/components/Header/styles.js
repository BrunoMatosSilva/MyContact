import styled from 'styled-components';

export const Container = styled.header`
  margin-top: 74px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputSearchContainer = styled.div`
  width: 100%;
  margin-top: 48px;

  input {
    width: 100%;
    background: #fff;
    border: none;
    border-radius: 25px;
    height: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.10);
    outline: none;
    padding: 0 16px;

    &::placeholder {
      color: ${({theme}) => theme.colors.gray[200]};
    }
  }
`;
