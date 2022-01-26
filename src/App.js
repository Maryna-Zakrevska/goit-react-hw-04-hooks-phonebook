import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm";
import { ContactList } from "./components/ContactList/ContactList";
import { Filter } from "./components/Filter/Filter";
import { PhonebookMainTitleStyled, PhonebookTitleStyled } from "./App.styled";
import { saveContact, loadContact } from "utils/localStorage";

const LS_KEY = "saved-phonebook-contacts";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const localSavedContacts = loadContact(LS_KEY);
    if (localSavedContacts?.length > 0) {
      setContacts(localSavedContacts);
    }
  }, []);

  useEffect(() => {
    saveContact(LS_KEY, contacts?.length > 0 ? contacts : []);
  }, [contacts]);

  const onChangeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) => contact.name.toLowerCase().includes(normalizedFilter));
  };

  const isSaved = (newName) => {
    const contact = contacts.find(({ name }) => name.toLowerCase() === newName.toLowerCase());
    if (contact) {
      alert(`${contact.name} is already in the contacts`);
    } else {
      return true;
    }
  };

  const onAddContactSubmit = ({ name, number }) => {
    if (!isSaved(name)) return;
    const contact = { id: nanoid(), name, number };
    setContacts((prevState) => [contact, ...prevState]);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter(({ id }) => id !== contactId);
    });
  };

  const filteredContacts = getVisibleContacts();

  return (
    <div>
      <div>
        <PhonebookMainTitleStyled>Phonebook</PhonebookMainTitleStyled>
        <ContactForm onSubmit={onAddContactSubmit} />
      </div>
      <PhonebookTitleStyled>Contacts</PhonebookTitleStyled>
      <Filter onChange={onChangeFilter} />
      <ContactList contacts={filteredContacts} onDeleteContact={deleteContact} />
    </div>
  );
}
