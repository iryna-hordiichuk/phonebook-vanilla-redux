import { useSelector } from 'react-redux';

export const selectContacts = state => state.contacts;
export const selectFilter = state => state.filter;

export const useVisibleContacts = () => {
  const contacts = useSelector(selectContacts);

  const filter = useSelector(selectFilter);
  const normalizedFilter = filter.toLocaleLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};
