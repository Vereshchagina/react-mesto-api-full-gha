import React, { useEffect, useState } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const textButton = isLoading ? "Загрузка..." : "Создать";

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]
  );

  const handlePlaceChange = (event) => {
    setName(event.target.value)
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlace({
      name,
      link,
    });
  };

  return (

    <PopupWithForm
      name="new-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={textButton}>
      <input
        name="name"
        type="text"
        placeholder="Название"
        className="popup__input popup__input_type_name"
        required
        minLength={2}
        maxLength={30}
        value={name || ""}
        onChange={handlePlaceChange}
        id="input-place"
      />
      <span className="popup__input-error input-place-error">
        Вы пропустили это поле
      </span>
      <input
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_description"
        required
        id="input-url"
        value={link || ""}
        onChange={handleLinkChange}
      />
      <span className="popup__input-error input-url-error">
        Вы пропустили это поле
      </span>
    </PopupWithForm>

  )

}

export default AddPlacePopup;

