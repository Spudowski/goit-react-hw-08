import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

export const AuthNav = () => {
  return (
    <div>
      <NavLink className={css.btn} to="/register">
        Register
      </NavLink>
      <NavLink className={css.btn} to="/login">
        Log In
      </NavLink>
    </div>
  );
};
