import { Overlay } from './styles';
import PropTypes from 'prop-types'

import ReactDOM from "react-dom";

export default function Loader({ isLoading }){
  if (!isLoading) {
  return null;
 }

 return ReactDOM.createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    document.getElementById('loader-root'),
  );
}

Loader.propType = {
  isLoading: PropTypes.bool.isRequired,
};
