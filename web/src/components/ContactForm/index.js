import PropTypes from 'prop-types';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import isEmailValid from '../../utils/isEmailValid';
import { ButtonContainer, Form } from './styles';
import { useState } from 'react';

export default function ContactForm({buttonLabel}){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function handleNameChange(e) {
    setName(e.target.value);

    if(!e.target.value){
      setErrors((prevState) => [
        ...prevState,
        {field: 'name', message: 'Nome é obrigatorio'},
      ]);
    }else{
      setErrors((prevState) => prevState.filter(
      (error) => error.field !== 'name',
      ))
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if(e.target.value && !isEmailValid(e.target.value)){
      const errorAlreadyExists = errors.find((error) => error.field === 'email');

      if(errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [
        ...prevState,
        { field: 'email', message: 'E-mail invalido.'},
      ])
    }else{
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'email',
      ));
    }
  }

  function getErrorMessageByFieldName(fieldName){
    return errors.find((error)=> error.field === fieldName)?.message;
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(
      {name, email, phone, category}
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
        error={getErrorMessageByFieldName('name')}
        placeholder="Nome"
        onChange={handleNameChange}
        value={name}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
        error={getErrorMessageByFieldName('email')}
        placeholder="E-mail"
        onChange={handleEmailChange}
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
