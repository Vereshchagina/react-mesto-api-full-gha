import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike, cards }) {

  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">

      <section className="profile">

        <button
          className="profile__image-edit-button"
          type="button"
          onClick={onEditAvatar}>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Аватар пользователя."
            name="avatar"
          />
        </button>

        <h1 className="profile__title" name="name">
          {currentUser.name}
        </h1>

        <p className="profile__subtitle" name="about">
          {currentUser.about}
        </p>

        <button
          type="button"
          className="profile__edit-button"
          aria-label="Изменить профиль."
          onClick={onEditProfile}
        />

        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить место."
          onClick={onAddPlace}
        />

      </section>

      <section className="places" aria-label="Блок с карточками мест">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          )
        }
        )}
      </section>
    </main>
  )
}

export default Main
