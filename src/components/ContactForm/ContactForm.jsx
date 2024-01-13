import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { selectContacts } from '../../redux/selectors';

import {
  ContactForm,
  ContactInput,
  ContactLabel,
  Button,
  FormError,
} from './ContactForm.styled';


// validation schema, валідація форм, схоже як валідація пропсів (library PropTypes)
// посилання на обєкт schema кладемо у Formik на спеціальний проп validationSchema
const schema = Yup.object().shape({
  name: Yup.string().required('Enter contact name'),
  number: Yup.string().required('Enter telephone number'),
});

// this is state for Formik, which is under the hood
const initialValues = {
  name: '',
  number: '',
};

export const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values,{ resetForm }) => {
    const {name, number} = values;
    const isAdded = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isAdded) {
      Notify.info(`${name} is already in contacts.`);
      return false;
    } else {
      dispatch(addContact(name, number));
      Notify.info(`${name} has been added to your Phonebook.`);
    }
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <ContactForm autoComplete="off">
        <ContactLabel htmlFor="name">
          Name
          <ContactInput
            type="text"
            name="name"
            placeholder="first name and surname"
          />
          <FormError name="name" component="p" />
        </ContactLabel>

        <ContactLabel htmlFor="number">
          Number
          <ContactInput
            type="tel"
            name="number"
            placeholder="telephone number"
          />
          <FormError name="number" component="p" />
        </ContactLabel>

        <Button type="submit">Add contact</Button>
      </ContactForm>
    </Formik>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
