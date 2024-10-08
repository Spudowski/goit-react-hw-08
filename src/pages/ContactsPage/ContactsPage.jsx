import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import { fetchContacts } from "../../redux/contacts/operations";
import SearchBox from "../../components/SearchBox/SearchBox";
import css from'./ContactsPage.module.css'


export default function ContactsPage() {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
      <div className={css.cont}>
        <h1>Contacts List</h1>
        <div>
          <SearchBox isActive={isActive} />
          <ContactForm setIsActive={setIsActive} />
          <ContactList isActive={isActive} />
        </div>
      </div>
    );
}