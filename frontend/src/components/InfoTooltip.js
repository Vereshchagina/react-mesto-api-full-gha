import React from 'react';
import fail from "../images/fail.svg";
import success from "../images/success.svg"

function InfoTooltip({ registerStatus, isOpen, onClose }) {

  const tooltipImage = registerStatus ? success : fail;
  const tooltipTitle = registerStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container_tooltip">
        <img className="popup__tooltip-image" src={tooltipImage} alt="Результат" />
        <h2 className="popup__title_tooltip">{tooltipTitle}</h2>
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

export default InfoTooltip
