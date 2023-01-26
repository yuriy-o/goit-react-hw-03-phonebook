import React, { Component } from 'react';
import { nanoid } from 'nanoid';

// import PropTypes from 'prop-types';

import { Container, H1, H2, Warning } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';

import { contacts } from './contacts.js';

export class App extends Component {
  state = {
    contacts: [...contacts],
    filter: '',
  };

  //? componentDidMount спрацьовує тільки одни раз
  //! (contacts?.length) теж само як => (contacts && contacts?.length)
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  //? Спрацьовує після кожного оновлення state
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      console.log('завантаження componentDidUpdate');
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  //! (addContact)
  formSubmitHandler = ({ name, number }) => {
    if (this.isDublicateContact(name)) {
      return alert(`${name} is already in the contacts`);
    }

    this.setState(prevState => {
      const { contacts } = prevState; //! тут можемо використати prevState, т.як всередині
      // const { contacts } = this.state; //! Або такий запис, тобто тут prevState === this.state
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };

      return { contacts: [newContact, ...contacts] };
    });
  };
  //! Функція перевірка імені перед додаванням з урахуванням регистру
  isDublicateContact(name) {
    const normalizeName = name.toLowerCase();
    const { contacts } = this.state;
    const contactCheck = contacts.find(contact => {
      return contact.name.toLowerCase() === normalizeName;
    });

    return Boolean(contactCheck);
  }

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
    const { removeContact, handleInputChange } = this;
    const contacts = this.filterContactByName();
    const isContacts = Boolean(contacts.length);

    return (
      <Container>
        <H1>Phonebook</H1>
        <ContactForm onSubmitForm={this.formSubmitHandler} />
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
