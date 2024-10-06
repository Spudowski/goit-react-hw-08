import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, fetchContacts } from "../../redux/contacts/operations";
import styles from "./ContactList.module.css";
import Modal from "../Modal/Modal";
import toast from "react-hot-toast";

const ContactList = ({ isActive }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filters.name.toLowerCase());

  const [isModalOpen, setModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = items.filter((contact) =>
    contact.name.toLowerCase().includes(filter)
  );

  const handleDelete = (contactId) => {
    setContactToDelete(contactId);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteContact(contactToDelete))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete contact.");
      });
    setModalOpen(false);
  };

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <ul>
        {filteredContacts.length > 0
          ? filteredContacts.map((contact) => (
              <li key={contact.id} className={styles.card}>
              {contact.name} <br /> ({contact.phone})
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </li>
            ))
          : isActive && <li className={styles.noContacts}>No contacts</li>}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default ContactList;
