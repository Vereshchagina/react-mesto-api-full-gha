import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const textButton = isLoading ? "Загрузка..." : "Сохранить";
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]
  );

  const handleNameChange = (event) => {
    setName(event.target.value)
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (

    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={textButton}>
      <input
        name="name"
        type="text"
        placeholder="Введите имя"
        className="popup__input popup__input_type_name"
        required
        minLength={2}
        maxLength={40}
        id="input-name"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__input-error input-name-error">
        Вы пропустили это поле
      </span>
      <input
        name="about"
        type="text"
        placeholder="Введите профессию"
        className="popup__input popup__input_type_description"
        required
        minLength={2}
        maxLength={200}
        id="input-description"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error input-description-error">
        Вы пропустили это поле
      </span>
    </PopupWithForm>

  )

}

export default EditProfilePopup;
