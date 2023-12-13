import { ContactList } from 'components/Contactlist';
import { Form } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { PageTitle, SectionTitle } from './App.styled';
import { FcSearch } from 'react-icons/fc';
import { Container } from 'components/Container/Container.jsx';

export const App = () => {
  
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
            <Form />
          </Container>

          <Container as="section" pt={30} pb={30}>
            <SectionTitle>Contacts</SectionTitle>
            <Filter icon={FcSearch} />
            <ContactList />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
