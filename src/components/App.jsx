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
    console.log('Mount');
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
    console.log('Update');
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  //! (addContact)
  formSubmitHandler = ({ name, number }) => {
    if (this.isDublicateContact(name)) {
      return alert(`${name} is already in the contacts`);
    }

    const newContact = {
      id: nanoidUA(), //ToDo ===> викликаю самописну функцію, яка генерує id за шаблоном 'UA-xxx'
      name: name.trim(),
      number: number.trim(),
    };

    //? або ===> const { contacts } = this.state; якщо зміну об'являємо зовні
    this.setState(prevState => {
      const { contacts } = prevState;

      return { contacts: [newContact, ...contacts], name: '', number: '' };
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
    const { removeContact, handleInputChange, formSubmitHandler } = this;
    const contacts = this.filterContactByName();
    const isContacts = Boolean(contacts.length);

    return (
      <Container>
        <H1>Phonebook</H1>
        <ContactForm onSubmitForm={formSubmitHandler} />
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
