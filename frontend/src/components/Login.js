import React, { useState } from 'react';

function Login({ onLogin }) {

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
    onLogin(formValue);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" name="signin" onSubmit={handleSubmit}>
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
        <button type="submit" className="auth__button">Войти</button>
      </form>
    </div>
  )

}
export default Login
