import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ContactFormStyled,
  ContactFormLabelStyled,
  ContactFormInputStyled,
  ContactFormButtonStyled,
} from "./ContactForm.styled";

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const reset = () => {
    setName("");
    setNumber("");
  };

  const addContact = (e) => {
    e.preventDefault();
    onSubmit({ name: name.trim(), number: number.trim() });
    reset();
  };

  const handleNameInputChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberInputChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <div>
      <ContactFormStyled onSubmit={addContact}>
        <ContactFormLabelStyled>
          Name
          <ContactFormInputStyled
            type="text"
            name="name"
            value={name}
            onChange={handleNameInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </ContactFormLabelStyled>
        <ContactFormLabelStyled>
          Number
          <ContactFormInputStyled
            type="tel"
            name="number"
            value={number}
            onChange={handleNumberInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </ContactFormLabelStyled>
        <ContactFormButtonStyled type="submit">Add contact</ContactFormButtonStyled>
      </ContactFormStyled>
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
