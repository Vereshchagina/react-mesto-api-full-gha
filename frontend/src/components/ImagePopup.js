import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__image-title">{card.name}</p>
        <button
          type="button"
          className="popup__close-button popup__image-close"
          aria-label="Закрыть окно."
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default ImagePopup
