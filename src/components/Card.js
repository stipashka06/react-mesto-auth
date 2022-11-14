import { useContext } from 'react';
import ContextUser from '../contexts/CurrentUserContext';

export default function Card({ cardData, onOpenImage, onDeleteCard, onCardLike, onCardDelete }) {
  const user = useContext(ContextUser);
  const handleLikeClick = () => { onCardLike(cardData) };
  const handleDeleteClick = () => { onCardDelete(cardData) };
  const handleCardClick = () => { onOpenImage(cardData) };

  const isLiked = cardData?.likes?.some(i => i?._id === user?._id);
  const cardLikeButtonClassName = (`${isLiked ? 'element__like_type_active' : 'element__like_type_passive'}`);

  const isOwn = cardData?.owner?._id === user?._id;
  const cardDeleteButtonClassName = (`${isOwn ? 'element__basket' : 'element__basket_display'}`);

  return (
    <article className="element">
      <img className="element__image" src={cardData?.link} alt={cardData?.name} onClick={handleCardClick} />
      <h2 className="element__title">{cardData?.name}</h2>
      <div className="element__block-like">
        <button className={`element__like ${cardLikeButtonClassName} cursor`} type="button" aria-label="Like" onClick={handleLikeClick}></button>
        <p className="element__amount-like">{cardData?.likes.length}</p>
      </div>
      <button className={`${cardDeleteButtonClassName} cursor`} type="button" aria-label="Удалить" onClick={handleDeleteClick} /* onClick={onDeleteCard} */></button>
    </article>
  );
};