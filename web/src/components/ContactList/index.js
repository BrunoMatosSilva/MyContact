import { Container, Header, Card, ListContainer } from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export function ContactList(){
  return (
    <Container>
      <Header>
        <strong>3 Contatos</strong>
        <a href="#">Novo Contato</a>
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
          <a href="/">
            <img src={edit} alt="Edit" />
          </a>
          <button>
            <img src={trash} alt="Delete" />
          </button>
        </div>
      </Card>

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
          <a href="/">
            <img src={edit} alt="Edit" />
          </a>
          <button>
            <img src={trash} alt="Delete" />
          </button>
        </div>
      </Card>

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
          <a href="/">
            <img src={edit} alt="Edit" />
          </a>
          <button>
            <img src={trash} alt="Delete" />
          </button>
        </div>
      </Card>
    </Container>
  );
}
