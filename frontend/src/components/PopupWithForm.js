import React from 'react';

function PopupWithForm({ name, title, children, isOpen, onClose, btnText, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} method="post" noValidate onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="popup__button"
            aria-label="Сохранить изменения."
          >
            {btnText}
          </button>
        </form>
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть окно."
          onClick={onClose}
        />
      </div>
    </div>

  )
}

export default PopupWithForm
