import useErrors from "../../hooks/useErrors";
import CategoriesService from "../../services/CategoriesService";
import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";
import useSafeAsyncState from "../../hooks/useSafeAsyncState";
import { useEffect, useImperativeHandle, useState } from "react";

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [categoryId, setCategoryId] = useState("");
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
      setName(contact.name ?? "");
      setEmail(contact.email ?? "");
      setPhone(formatPhone(contact.phone ?? ""));
      setCategoryId(contact.category.id ?? "");
    },
    resetFields: () => {
      setName("");
      setEmail("");
      setPhone("");
      setCategoryId("");
    }
  }), []);

  useEffect(() => {
    async function loadCategories() {
      setIsLoadingCategories(true);
      try{
        const categoriesList = await CategoriesService.listCategories();

        setCategories(categoriesList);
      }catch(erro){
        console.log(erro.message);
      }finally{
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  },[setCategories, setIsLoadingCategories]);

  function handleNameChange(e) {
    setName(e.target.value);

    if(!e.target.value){
      setError({ field: "name", message: "Nome é obrigatório." });
    }else{
      removeError("name");
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if(e.target.value && !isEmailValid(e.target.value)){
      setError({ field: "email", message: "E-mail não é valido." });
    }else{
      removeError("email");
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

  return {
    name,
    email,
    phone,
    categoryId,
    setCategoryId,
    categories,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleSubmit,
    isLoadingCategories,
    isSubmitting,
    getErrorMessageByFieldName,
    isFormValid,
  };
}
