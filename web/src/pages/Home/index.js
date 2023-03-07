import Loader from "../../components/Loader";
import {Container,} from "./styles";

import useHome from "./useHome";
import InputSearch from "./components/InputSearch";
import Header from "./components/Header";
import ErrorStatus from "./components/ErrorStatus";
import EmptyList from "./components/EmptyList";
import SearchNotFoundStatus from "./components/SearchNotFound";
import ContactsList from "./components/ContactsList";
import Modal from "../../components/Modal";

export default function Home(){
  const {
    isLoading,
    contactBeingDeleted,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isDeleteModalVisible,
    hasError,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {(hasContacts && hasContacts) && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && (<EmptyList />)}
      {isSearchEmpty && <SearchNotFoundStatus searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            isLoading={isLoadingDelete}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
            visible={isDeleteModalVisible}
          >
            <p>
          Esta ação não poderá ser desfeita!
            </p>
          </Modal>
        </>
      )}

    </Container>
  );
}
