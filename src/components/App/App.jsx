import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from 'components/Contactlist';
import { Form } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { PageTitle, SectionTitle } from './App.styled';
import { Notify } from 'notiflix';
import { FcSearch } from 'react-icons/fc';

import { Container } from 'components/Container/Container.jsx';

//! ПАТТЕРН ДЛЯ РОБОТИ ІЗ ЛОКАЛ СТОРЕДЖ (функція ініціалізатор)
// * ініціалізація стейт від локального сховища
// useEffect працює асинхронно саме при роботі із LS,
// якщо useEffect є кілька в коді, то порядок їх виконання
// не гарантований.
// якщо є два useEfect, вони обидва запускаються під час першого рендера (монтування),
// невідомо який перший із них спрацює, іх порядок в коді не має значення
// тож першим може запуститись той юзЕфект який записує початкові дані
// із стейта в локал сторедж, а там уже можуть бути дані які були раніше збережені юзером
// і саме вони повинні виводитись на екран, а не дані із initialState.
// (в цьому завданні initialState - порожній масив)
// для вирішення проблеми (ініціювати стейт синхронно) викор. функція ініціалізатор,
// яка передається в useState
// в юзСтейт крім велю можна передати функцію, яка поверне це велю
// ця ф-я має бути синхронна (not http requests)
// можна прописати всю ф-ю в юзСтейт, або створити зовнішню.

const KEY = 'contacts';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(KEY)) ?? initialContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = id => {
    setContacts(prevState => contacts.filter(contact => contact.id !== id));
  };

  const addContact = values => {
    const { name, number } = values;
    const id = nanoid();
    const newContact = { name, number, id }; //!Property value shorthand
    const isAdded = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isAdded) {
      Notify.info(`${name} is already in contacts.`);
      return false;
    } else {
      setContacts(prevState => [newContact, ...contacts]);
      Notify.info(`${name} has been added to your Phonebook.`);
    }
  };

  const changeFilter = evt => setFilter(evt.currentTarget.value);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

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
            <Form onSubmit={addContact} />
          </Container>

          <Container as="section" pt={30} pb={30}>
            <SectionTitle>Contacts</SectionTitle>
            <Filter value={filter} onChange={changeFilter} icon={FcSearch} />
            <ContactList
              contacts={getFilteredContacts()}
              onDeleteContact={deleteContact}
            />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
