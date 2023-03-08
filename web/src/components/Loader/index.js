import { Overlay } from './styles';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';
import useAnimatedUnMount from '../../hooks/useAnimatedUnmount';

export default function Loader({ isLoading }){
  const {shouldRender, animetedElementRef} = useAnimatedUnMount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay isLeaving={!isLoading}  ref={animetedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propType = {
  isLoading: PropTypes.bool.isRequired,
};
