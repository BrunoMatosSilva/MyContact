import { Link } from 'react-router-dom';

import { Card, Container, Header, InputSearchContainer, ListContainer } from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Modal from '../../components/Modal';


export default function Home(){
  return (
    <Container>
    <Modal danger />
    <InputSearchContainer>
      <input type="text" placeholder="pesquisar contato..." />
    </InputSearchContainer>

    <Header>
      <strong>3 Contatos</strong>
      <Link to="/new">Novo Contato</Link>
    </Header>

    <ListContainer>
      <header>
        <button type="button">
          <span>Nome</span>
          <img src={arrow} alt="Arrow" />
        </button>
      </header>
    </ListContainer>

    <Card>
      <div className="info">
        <div className="contact-name">
          <strong>Bruno Matos</strong>
          <small>instagram</small>
        </div>
        <span>brunomatos@bmsdev.com.br</span>
        <span>(11) 97755-3377</span>
      </div>

      <div className="actions">
        <Link to="/edit/123">
          <img src={edit} alt="Edit" />
        </Link>
        <button>
          <img src={trash} alt="Delete" />
        </button>
      </div>
    </Card>
  </Container>
  );
}
