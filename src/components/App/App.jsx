import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from 'components/Contactlist';
import { Form } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import {PageTitle, SectionTitle} from './App.styled';
import { Notify } from 'notiflix';
import {FcSearch } from 'react-icons/fc';

import { Container } from 'components/Container/Container.jsx';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };

componentDidMount() { 
const savedContacts = localStorage.getItem('contacts');

if(savedContacts !== null){
  this.setState({contacts: JSON.parse(savedContacts)})
}
 }

componentDidUpdate(_, prevState) {

  if(prevState.contacts !== this.state.contacts){
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

};

  deleteContact = id => {
    this.setState(prevState => ( {
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  addContact = (values) => {
    const {name, number} = values;
    const id = nanoid();
    const newContact = { name, number, id }; //Property value shorthand

    const isAdded = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isAdded) {
      Notify.info(`${name} is already in contacts.`);
      return false;
    } else {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
      Notify.info(`${name} has been added to your Phonebook.`);
    }
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getFilteredContacts();
    return (
      <Container as="main">
        <Container
          as="div"
          maxWidth={1250}
          pl={15}
          pr={15}
          ml={'auto'}
          mr={'auto'}
        >
        <Container
            as="div"
            width={600}
            ml={'auto'}
            mr={'auto'}
            backgroundColor={'secondBackground'}
            p={40}
          >
         <PageTitle>Phonebook</PageTitle>

         <Container as="section" pt={30} pb={30}>
          <Form onSubmit={this.addContact} />
          </Container>

        <Container as="section" pt={30} pb={30}>
       <SectionTitle>Contacts</SectionTitle>
          <Filter value={this.state.filter} onChange={this.changeFilter} icon={FcSearch} />
          <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
          </Container>

          </Container>

        </Container>

      </Container>
    );
  }
}
