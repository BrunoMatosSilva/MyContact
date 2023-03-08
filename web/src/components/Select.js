import styled from 'styled-components';

export default styled.select`
  width: 100%;
  border: none;
  height: 54px;
  background: #fff;
  border: 2px solid #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.10);
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border 0.2s ease-in;
  appearance: none;

  &:hover {
    border: 2px solid ${({theme}) => theme.colors.primary.main};
  }

  &:focus {
    border: 2px solid ${({theme}) => theme.colors.primary.main};
  }

  &[disabled] {
    background: ${({theme}) => theme.colors.gray[100]};
    border-color: ${({theme}) => theme.colors.gray[200]};
  }
`;
