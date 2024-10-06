import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import { LuLogOut } from "react-icons/lu";
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.wrapper}>
      <p className={css.welcome}>
        Welcome, <span className={css.username}>{user.name}</span>
      </p>
      <button
        type="button"
        className={css.btn}
        onClick={() => dispatch(logOut())}
      >
        <div className={css.sign}>
          <LuLogOut />
        </div>
        <div className={css.text}>Logout</div>
      </button>
    </div>
  );
};
