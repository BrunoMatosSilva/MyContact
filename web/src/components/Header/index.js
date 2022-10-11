import { Container, InputSearchContainer } from './styles';

import logo from '../../assets/images/logo.svg';

export function Header() {
  return (
    <Container>
      <img src={logo} alt="MyContacts" width="201px" />

      <InputSearchContainer>
        <input type="text" placeholder="pesquisar contato..." />
      </InputSearchContainer>
    </Container>
  );
}
