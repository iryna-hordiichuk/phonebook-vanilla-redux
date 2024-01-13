import { ContactItem } from 'components/ContactItem';
import { List } from './ContactList.styled';
import { useVisibleContacts } from '../../redux/selectors';

export const ContactList = () => {
  const visibleContacts = useVisibleContacts();
  console.log(visibleContacts);

  return (
    <List>
      {visibleContacts.map(({ id, name, number }) => (
        <ContactItem key={id} name={name} number={number} id={id} />
      ))}
    </List>
  );
};
