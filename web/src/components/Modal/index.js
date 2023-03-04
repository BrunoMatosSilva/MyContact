import PropTypes from "prop-types";
import { Container, Overlay, Footer } from "./styles";

import Button from "../Button";
import ReactPortal from "../ReactPortal";

export default function Modal({
  danger,
  title,
  isLoading,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible,
}){
  if (!visible){
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
        <Container danger={danger}>
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>,
    </ReactPortal>
  );
}

Modal.protoType = {
  danger: PropTypes.boolean,
  visible: PropTypes.bool,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  cancelLabel: "Cancelar",
  confirmLabel: "Confirmar",
  isLoading: false,
};
