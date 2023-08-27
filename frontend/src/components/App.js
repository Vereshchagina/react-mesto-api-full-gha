import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

import api from '../utils/Api';
import * as auth from "../utils/auth";

import Header from './Header'
import Main from './Main';
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilerPopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [registerStatus, setRegisterStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const jwt = localStorage.jwt;
    if (jwt) {
      auth.getUserData(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.email);
          navigate("/");
        }
      })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [navigate]
  );

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
        .then(([user, cards]) => {
          setCurrentUser(user)
          setCards(cards);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn]
  );

  const handleAuthorization = ({ email, password }) => {
    auth.authorization(email, password).then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/");
      }
    })
      .catch((err) => {
        setRegisterStatus(false);
        setIsInfoTooltipOpen(true);
        console.log(err)
      })
  };

  const handleRegistration = ({ email, password }) => {
    auth.registration(email, password).then(() => {
      setRegisterStatus(true);
      setIsInfoTooltipOpen(true);
      navigate("/sign-in");
    })
      .catch((err) => {
        setRegisterStatus(false);
        setIsInfoTooltipOpen(true);
        console.log(err)
      })
  }

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    navigate("/sign-in");
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked, localStorage.jwt)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id, localStorage.jwt)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true)
    api.updateUserInfo({ name, about }, localStorage.jwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true)
    api.updateUserAvatar({ avatar }, localStorage.jwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true)
    api.addCard({ name, link }, localStorage.jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };

  const handleAppPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  };

  const handleCardClick = (card) => {
    setSelectedCard(card)
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header
          email={email}
          onSignOut={handleSignOut}
        />

        <Routes>

          <Route path="/sign-in"
            element={<Login
              onLogin={handleAuthorization}
            />
            }
          />

          <Route path="/sign-up"
            element={<Register
              onRegister={handleRegistration}
            />
            }
          />

          <Route
            path="/"
            element={<ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAppPlaceClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              cards={cards}
            />}
          />

        </Routes>


        <Footer />

        <InfoTooltip
          registerStatus={registerStatus}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilerPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
