import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Form, Label, Span, Input } from './ContactForm.styled';

//! форма це завжди класовий компонент
export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  //! Записує данні з інпуту в STATE
  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  //! (addContact)
  handleSubmit = e => {
    e.preventDefault();

    // this.props.onSubmitForm(this.state); //? Короткий запис без умови, ↓↓↓ або ↓↓↓

    //?  Забираємо onSubmitForm з this.props
    const { onSubmitForm } = this.props;
    //? та в onSubmitForm передає на гору в стейт
    const result = onSubmitForm({ ...this.state });

    if (result) {
      this.reset();
    }
  };

  //! Очищення форми після submit
  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const { name, number } = this.state;

    return (
      <Form onSubmit={handleSubmit}>
        <Label>
          <Span>Name</Span>
          <Input
            type="text"
            placeholder="Enter your first and second name"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>

        <Label>
          <Span>Number</Span>
          <Input
            type="tel"
            placeholder="Enter your phone number"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>

        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}

//! ВИДАЄ ПОМИЛКУ ЯКЩО .isRequired
ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
