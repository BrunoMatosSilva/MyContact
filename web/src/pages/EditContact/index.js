import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function EditContact(){
  const {id} = useParams();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContact(){
      try{
        const contactData = await ContactsService.getContactById(id);

        console.log(contactData);
        setIsLoading(false);
      }catch{
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado!',
        })
      }
    }

    loadContact();
  },[id, history])

  function handleSubmit(){
    //
  }
  return (
    <>
    <Loader isLoading={isLoading} />
    <PageHeader title="Editar Contato" />

    <ContactForm
      buttonLabel="Salvar Alterações"
      onSubmit={handleSubmit}
    />
    </>
  );
}
