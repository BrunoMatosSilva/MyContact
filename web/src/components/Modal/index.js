import PropTypes from 'prop-types';
import { Container, Overlay, Footer } from "./styles";

import Button from "../Button";

export default function Modal({danger}){
  return(
    <Overlay>
      <Container danger={danger}>
        <h1>Titulo do Modal</h1>
        <p>
          Corpo do Modal
        </p>

        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button danger={danger}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>
  );
}

Modal.protoType = {
  danger: PropTypes.boolean
};

Modal.defaultProps = {
  danger: false,
}
