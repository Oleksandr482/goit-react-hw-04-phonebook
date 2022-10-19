import { ContactsForm } from './ContactsForm/ContactsForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';

export const App = () => {
  const startContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? startContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filterInput = e => {
    setFilter(e.currentTarget.value);
  };

  const addContact = contact => {
    if (
      contacts.find(item => {
        return item.name === contact.name;
      })
    ) {
      return alert(`${contact.name} is already in contacts`);
    } else {
      setContacts(prevState => [...prevState, contact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts
    .filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    })
    .sort((f, s) => f.name.localeCompare(s.name));

  return (
    <>
      <h1>Phonebook</h1>
      <ContactsForm onSubmit={addContact} />
      <div>
        <h2>Contacts</h2>
        <Filter filterKey={filter} onChange={filterInput} />
        <ContactsList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    </>
  );
};
