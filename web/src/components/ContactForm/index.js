import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import { ButtonContainer, Form } from './styles';

export default function ContactForm({buttonLabel}){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors
  } = useErrors();

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    async function loadCategories() {
      setIsLoadingCategories(true);
      try{
        const caregoriesList = await CategoriesService.listCategories();

        setCategories(caregoriesList);

      }catch{}finally{
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  },[])

  function handleNameChange(e) {
    setName(e.target.value);

    if(!e.target.value){
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    }else{
      removeError('name');
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if(e.target.value && !isEmailValid(e.target.value)){
      setError({ field: 'email', message: 'E-mail não é valido.' });
    }else{
      removeError('email')
    }
  }

  function handlePhoneChange(e){
    setPhone(formatPhone(e.target.value));
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(
      {name, email, phone, categoryId}
    )
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
        error={getErrorMessageByFieldName('name')}
        placeholder="Nome *"
        onChange={handleNameChange}
        value={name}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
        type="email"
        error={getErrorMessageByFieldName('email')}
        placeholder="E-mail"
        onChange={handleEmailChange}
        value={email}
        />
      </FormGroup>

      <FormGroup>
        <Input
        type="tel"
        placeholder="(11) 9 9999-9999"
        onChange={handlePhoneChange}
        value={phone}
        maxLength="15"
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        disabled={isLoadingCategories}
        >
          <option value="">Sem categoria</option>
         {categories.map((category) => (
           <option key={category.id} value={category.id}>{category.name}</option>
         ))}


        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
