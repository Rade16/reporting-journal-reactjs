import React from "react";
import welcome from "./../../assets/Welcome.svg";
import "./main.scss";
const main = () => {
  return (
    <div className="main">
      <div className="main__container">
        <div className="main__aboutBlock">
          <div className="main__about">
            <h1 className="main__title">Что такое Reporting Journal?</h1>
            <p className="main__text">
                <span className="main__text-bold"> Reporting Journal</span> - это
              web-приложение, которое упростит работу преподавателя и куратора,
              позволив в одном месте прикреплять для себя темы занятий и
              задания, а также отмечать отсутствующих с дальнейшим экспортом в
              Exel-файл
            </p>
          </div>
          <img src={welcome} alt="" />
        </div>
        <div className="main__loginBlock">
          <div className="main__loginBlock-container">
            <h1 className="main__loginBlock-title">Вход в аккаунт</h1>
            <label htmlFor="login" className="main__loginBlock-label">
              Логин:
            </label>
            <input type="text" className="main__loginBlock-input" id="login" />
            <label htmlFor="password" className="main__loginBlock-label">
              Пароль:
            </label>
            <input
              type="password"
              className="main__loginBlock-input"
              id="password"
            />
            <button className="main__loginBlock-button">Войти</button>
            <p className="main__loginBlock-access" data-modal="modalMainInfo">
              Как получить доступ?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default main;