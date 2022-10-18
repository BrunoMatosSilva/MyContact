import styled from "styled-components";

export default styled.button`
  width: 100%;
  height: 52px;
  border: none;
  background: ${({theme}) => theme.colors.primary.main};
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.10);
  padding: 0 16px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.2s ease-in;

  &:hover {
    background: ${({theme}) => theme.colors.primary.light};
  }

  &:active {
    background: ${({theme}) => theme.colors.primary.dark};
  }

  &[disabled]{
    background: #ccc;
    cursor: not-allowed;
  }
`;
