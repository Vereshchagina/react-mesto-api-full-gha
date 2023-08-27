import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

  const [formValue, setFormValue] = useState({ email: "", password: "" })

  const handleChange = (event) => {
    const input = event.target
    setFormValue({
      ...formValue,
      [input.name]: input.value,
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(formValue);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" name="signup" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="auth__input"
          required
          id="input-email"
          onChange={handleChange}
          value={formValue.email}
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          className="auth__input"
          required
          id="input-password"
          onChange={handleChange}
          value={formValue.password}
        />
        <button type="submit" className="auth__button">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="auth__link" href="">Уже зарегистрированы? Войти</Link>
    </div>
  )

}

export default Register
