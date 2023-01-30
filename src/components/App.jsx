import React, { Component } from 'react';
// import { nanoid } from 'nanoid';
// import PropTypes from 'prop-types';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';
import { nanoidUA } from './additions/nanoidUA';

import { Container, H1, H2, Warning } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(savedContacts);

    if (savedContacts === null) {
      return this.setState({ contacts: this.props.initialContacts });
    }
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  //! (addContact)
  formHandleSubmit = (values, { resetForm }) => {
    resetForm();

    const { name, number } = values;
    const contact = { name, number };

    const dublicateContact = this.findDublicateContact(
      contact,
      this.state.contacts
    );

    dublicateContact
      ? alert(`${contact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { ...values, id: nanoidUA() }],
        }));
  };

  //! Функція перевірки імені перед додаванням з урахуванням регистру
  findDublicateContact = (contact, contactsList) => {
    return contactsList.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  filterContactByName = () => {
    const { filter, contacts } = this.state;

    //! якщо фільтр пустий, то відразу показуємо контакти
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

  render() {
    const { removeContact, handleInputChange, formHandleSubmit } = this;
    const contacts = this.filterContactByName();
    const isContacts = Boolean(contacts.length);

    return (
      <Container>
        <H1>Phonebook</H1>
        <ContactForm onSubmitForm={formHandleSubmit} />
        <H2>Contacts</H2>
        <ContactsFilter handleInputChange={handleInputChange} />

        {isContacts && (
          <ContactList removeContact={removeContact} contacts={contacts} />
        )}
        {!isContacts && <Warning>No contacts in the list</Warning>}
      </Container>
    );
  }
}
