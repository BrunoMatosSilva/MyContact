import PropTypes from 'prop-types';

import FormGroup from "../FormGroup";
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import { ButtonContainer, Form } from "./styles";

export default function ContactForm({buttonLabel}){
  return (
    <Form>
      <FormGroup>
        <Input type="text" placeholder="Nome" />
      </FormGroup>

      <FormGroup>
        <Input type="email" placeholder="E-mail" />
      </FormGroup>

      <FormGroup>
        <Input type="phone" placeholder="(11) 99999-9999" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="whatsapp">Whatsapp</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
