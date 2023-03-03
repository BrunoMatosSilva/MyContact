import PropTypes from 'prop-types';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import { ButtonContainer, Form } from './styles';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

const ContactForm = forwardRef(({buttonLabel, onSubmit}, ref) =>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors
  } = useErrors();
  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    }
  }), []);

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
  },[setCategories, setIsLoadingCategories])

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

  async function handleSubmit(e){
    e.preventDefault();
    setIsSubmitting(true);

   await onSubmit({
      name, email, phone, categoryId
    });

    setIsSubmitting(false);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
        error={getErrorMessageByFieldName('name')}
        placeholder="Nome *"
        onChange={handleNameChange}
        value={name}
        disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
        type="email"
        error={getErrorMessageByFieldName('email')}
        placeholder="E-mail"
        onChange={handleEmailChange}
        value={email}
        disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
        type="tel"
        placeholder="(11) 9 9999-9999"
        onChange={handlePhoneChange}
        value={phone}
        maxLength="16"
        disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>
         {categories.map((category) => (
           <option key={category.id} value={category.id}>{category.name}</option>
         ))}


        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  )
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ContactForm;
