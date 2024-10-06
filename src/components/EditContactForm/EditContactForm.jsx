import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import styles from "./EditContactForm.module.css";

const EditContactForm = ({ contact, onClose }) => {
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateContact({ id: contact.id, updatedContact: { name, phone } }))
      .unwrap()
      .then(() => {
        toast.success("Contact updated successfully!");
        onClose();
      })
      .catch(() => {
        toast.error("Failed to update contact.");
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default EditContactForm;