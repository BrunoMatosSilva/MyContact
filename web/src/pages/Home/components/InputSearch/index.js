import PropTypes from 'prop-types';
import { Container } from './styles';

export default function InputSearch({ value, onChange }){
  return (
    <Container>
      <input
        value={value}
        type="text"
        placeholder="pesquisar contato..."
        onChange={onChange}
      />
    </Container>
  );
}

InputSearch.prototype = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
