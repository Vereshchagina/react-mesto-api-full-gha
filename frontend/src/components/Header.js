import React from 'react';
import logo from '../images/logo.svg'
import { Routes, Route, Link } from 'react-router-dom';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Место. Россия."
        className="header__logo"
      />

      <Routes>

        <Route
          path="/sign-up"
          element={<Link className="header__link" to="/sign-in">Войти</Link>}
        />

        <Route
          path="/sign-in"
          element={<Link className="header__link" to="/sign-up">Регистрация</Link>}
        />

        <Route
          path="/"
          element={
            <div className="header__info">
              <p className="header__user-email">{email}</p>
              <button className="header__button" onClick={onSignOut}>Выйти</button>
            </div >
          }
        />

      </Routes>

    </header>
  )
}

export default Header



