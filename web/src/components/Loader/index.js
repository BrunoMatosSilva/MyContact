import { Overlay } from './styles';
import PropTypes from 'prop-types'

import ReactDOM from "react-dom";
import Spinner from '../Spinner';

export default function Loader({ isLoading }){
  if (!isLoading) {
  return null;
 }

 return ReactDOM.createPortal(
    <Overlay>
      <Spinner size={90} />
    </Overlay>,
    document.getElementById('loader-root'),
  );
}

Loader.propType = {
  isLoading: PropTypes.bool.isRequired,
};
