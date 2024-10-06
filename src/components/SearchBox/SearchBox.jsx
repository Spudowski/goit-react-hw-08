import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/contacts/filtersSlice";
import styles from './SearchBox.module.css';

const SearchBox = ({ isActive }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.query);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    isActive && (
      <div className={styles.cont}>
        <input
          className={styles.searchbox}
          type="text"
          placeholder="Search contacts..."
          value={filter}
          onChange={handleChange}
        />
      </div>
    )
  );
};

export default SearchBox;
