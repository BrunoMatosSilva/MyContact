import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container } from "./style";

export default function Header({
  hasError,
  qtyOfContacts,
  qtyOfFilteredContacts
}) {

  const alignment = hasError
    ? "flex-end"
    : (
      qtyOfContacts > 0
        ? "space-between"
        : "center"
    );

  return (
    <Container
      justifyContent={alignment}
    >
      {(!hasError && qtyOfContacts > 0) && (
        <strong>
          {qtyOfFilteredContacts}
          {qtyOfFilteredContacts === 1 ? " contato" : " contatos"}
        </strong>
      )}
      <Link to="/new">Novo Contato</Link>
    </Container>
  );
}

Header.prototype = {
  hasError: PropTypes.bool.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
};
