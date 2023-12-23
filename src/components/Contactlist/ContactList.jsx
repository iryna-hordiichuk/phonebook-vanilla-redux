import {useSelector} from "react-redux";
import { ContactItem } from 'components/ContactItem';
import { List } from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts);
  console.log(contacts);
  const filter = useSelector(state => state.filter);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();
  console.log(visibleContacts);

  return (
    <List>
      {visibleContacts.map(({id, name,number} )=> (
        <ContactItem key={id} name={name} number={number} id={id}/>
      ))}
    </List>
  );
};
