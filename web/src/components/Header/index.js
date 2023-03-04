import { Container } from "./styles";

import logo from "../../assets/images/logo.svg";

export function Header() {
  return (
    <Container>
      <img src={logo} alt="MyContacts" width="201px" />
    </Container>
  );
}
