import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassname = (`place__like ${isLiked && 'place__like_active'}`);

  const handleCardClick = () => {
    onCardClick(card)
  };

  const handleDeleteClick = () => {
    onCardDelete(card)
  };

  const handleCardLike = () => {
    onCardLike(card)
  };

  return (
    <article className="place">
      <img className="place__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      {isOwn && <button type="button" className="place__delete" aria-label="Удалить." onClick={handleDeleteClick} />}
      <div className="place__content">
        <h2 className="place__text">{card.name}</h2>
        <div className="place__likes">
          <button type="button" className={cardLikeButtonClassname} aria-label="Нравится." onClick={handleCardLike} />
          <span className="place__counter">{card.likes.length}</span>
        </div>
      </div>
    </article>

  )
}

export default Card
