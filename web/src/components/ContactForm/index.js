import PropTypes from 'prop-types';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import { ButtonContainer, Form } from "./styles";
import { useState } from 'react';

export default function ContactForm({buttonLabel}){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    console.log(
      {name, email, phone, category}
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
        type="text"
        placeholder="Nome"
        onChange={(e) => setName(e.target.value)}
        value={name}
        />
      </FormGroup>

      <FormGroup>
        <Input
        type="email"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
      </FormGroup>

      <FormGroup>
        <Input
        type="phone"
        placeholder="(11) 99999-9999"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        />
      </FormGroup>

      <FormGroup>
        <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Categoria</option>
          <option value="Intagram">Instagram</option>
          <option value="Whatsapp">Whatsapp</option>
          <option value="Discord">Discord</option>
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
