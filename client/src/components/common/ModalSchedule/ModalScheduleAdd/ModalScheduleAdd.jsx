import React, { useState } from "react";
import styles from "./ModalScheduleAdd.module.scss";
import Modal from "../../modal/Modal";
import axios from "axios";
const ModalStudentAdd = ({ closeFn = () => null, open = false, id, day }) => {
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const addSchedule = async () => {
    try {
      await axios.post("http://localhost:5001/api/schedule", {
        subject,
        teacher,
        dayOfWeek: day,
        groupId: id,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal open={open}>
      <div className="modal__mask">
        <div className="modal__window">
          <header className="modal__header">
            <h1 className="modal__title">Добавить предмет</h1>
            <button className="modal__close" type="button" onClick={closeFn}>
              X
            </button>
          </header>
          <div className="modal__body">
            <label htmlFor="lesson" className={styles.modal__label}>
              Выберите предмет:
            </label>
            <div className={styles.modal__customSelect}>
              <select
                id="chooseLesson"
                className={styles.modal__select}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="Нет пары">Нет пары</option>
                <option value="Проектирование и разработка интерфейсов">
                  Проектирование и разработка интерфейсов
                </option>
                <option value="Граф. дизайн">Граф. дизайн</option>
                <option value="Тестирование ИС">Тестирование ИС</option>
                <option value="Основы управления проектной деятельностью">
                  Основы управления проектной деятельностью
                </option>
                <option value="Веб-разработка">Веб-разработка</option>
                <option value="Иностранный язык в ПД">
                  Иностранный язык в ПД
                </option>
                <option value="Проектирование и дизайн ИС">
                  Проектирование и дизайн ИС
                </option>
              </select>
            </div>
            <label htmlFor="lessonTeacher" className={styles.modal__label}>
              Выберите имя преподавателя:
            </label>
            <div className={styles.modal__customSelect}>
              <select
                id="chooseTeacher"
                className={styles.modal__select}
                onChange={(e) => setTeacher(e.target.value)}
              >
                <option value="Выберите преподавателя">
                  Выберите преподавателя
                </option>
                <option value="Нет пары">Нет пары</option>
                <option value="Лутфулин Д.А.">Лутфулин Д.А.</option>
                <option value="Ковалева Е.А">Ковалева Е.А</option>
                <option value="Федотов И.В">Федотов И.В</option>
                <option value="Важенина Е.Г.">Важенина Е.Г.</option>
                <option value="Климова Г.Л.">Климова Г.Л.</option>
                <option value="Ермолаев А.А">Ермолаев А.А</option>
              </select>
            </div>
            <button
              className={styles.modal__button}
              onClick={() => addSchedule()}
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalStudentAdd;
