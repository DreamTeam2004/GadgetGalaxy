import React, { SyntheticEvent, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { toast } from "react-toastify";

import PasswordInput from "@/components/PasswordInput";

import "@/assets/styles/style-components/Modal.scss";
import google from "@/assets/images/Google.png";
import { useDispatch } from "react-redux";
import {
  loginUserWithGoogle,
  loginUserWithPassword,
} from "@/lib/store/slices/UserSlice";
import { AppDispatch } from "@/lib/store/store";
import { unwrapResult } from "@reduxjs/toolkit";

interface AuthModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onRequestClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const switchToSignIn = () => {
    if (!isSignIn) {
      setIsSignIn(true);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };
  const switchToSignUp = () => {
    if (isSignIn) {
      setIsSignIn(false);
      setEmail("");
      setPassword("");
    }
  };
  const handlePasswordLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Пожалуйста, заполните все поля.");
      return;
    }
    try {
      const resultAction = await dispatch(
        loginUserWithPassword({ email, password })
      );
      unwrapResult(resultAction);

      toast.success("Авторизация прошла успешно");
      setEmail("");
      setPassword("");
      onRequestClose();
    } catch (error: any) {
      toast.error(error);
    }
  };
  const handleGoogleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUserWithGoogle());
      unwrapResult(resultAction);

      toast.success("Авторизация c помощью Google прошла успешно");
      setEmail("");
      setPassword("");
      onRequestClose();
    } catch (error: any) {
      toast.error(error);
    }
  };
  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Пожалуйста, заполните все поля.");
      return;
    } else if (password.length < 8) {
      toast.error("Пароль должен содержать минимум 8 символов.");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Пароли не совпадают.");
      return;
    }

    try {
      const response = await fetch("/api/users/register/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Регистрация прошла успешно");
        switchToSignIn();
      } else {
        toast.error(data.error_message);
      }
    } catch (error) {
      toast.error("Неизвестная ошибка");
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Authorization Modal"
      ariaHideApp={false}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal__inner">
        <div className="modal__nav">
          <div
            className={`modal__title ${isSignIn ? "active" : ""}`}
            onClick={switchToSignIn}
          >
            Вход
          </div>
          <div
            className={`modal__title ${isSignIn ? "" : "active"}`}
            onClick={switchToSignUp}
          >
            Регистрация
          </div>
        </div>

        {isSignIn ? (
          <form className="modal__content">
            <div className="modal__block-input">
              <label htmlFor="emailSignIn" className="modal__label">
                Email
              </label>
              <input
                type="email"
                id="emailSignIn"
                className="modal__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>
            <PasswordInput
              id="passwordSignIn"
              label="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="modal__button" onClick={handlePasswordLogin}>
              Войти
            </button>
            <div className="modal__divider">
              <hr className="modal__divider-line" />
              <span className="modal__divider-text">или</span>
              <hr className="modal__divider-line" />
            </div>
            <button
              className="modal__button-google"
              onClick={handleGoogleLogin}
            >
              <Image
                src={google}
                alt="google"
                className="modal__button-google-img"
              />
              <span className="modal__button-google-text">
                Войти с помощью Google
              </span>
            </button>
          </form>
        ) : (
          <form className="modal__content" onSubmit={handleRegister}>
            <div className="modal__block-input">
              <label htmlFor="nameSignUp" className="modal__label">
                Имя
              </label>
              <input
                type="text"
                id="nameSignUp"
                className="modal__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="modal__block-input">
              <label htmlFor="emailSignUp" className="modal__label">
                Email
              </label>
              <input
                type="email"
                id="emailSignUp"
                className="modal__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>
            <PasswordInput
              id="passwordSignUp"
              label="Пароль"
              placeholder="8+ знаков"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              id="confirmPasswordSignUp"
              label="Подтвердите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="modal__button">Зарегистрироваться</button>
            <p className="modal__description">
              Нажимая кнопку «Зарегистрироваться», я даю свое согласие на сбор и
              обработку моих персональных данных
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
