import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, fetchContacts } from "../../redux/contacts/operations";
import styles from "./ContactList.module.css";

const ContactList = ({ isActive }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filters.name.toLowerCase());

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = items.filter((contact) =>
    contact.name.toLowerCase().includes(filter)
  );

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {filteredContacts.length > 0
        ? filteredContacts.map((contact) => (
            <li key={contact.id} className={styles.container}>
              {contact.name} ({contact.phone})
              <button onClick={() => dispatch(deleteContact(contact.id))}>
                Delete
              </button>
            </li>
          ))
        : isActive && <li className={styles.noContacts}>No contacts</li>}
    </ul>
  );
};

export default ContactList;
