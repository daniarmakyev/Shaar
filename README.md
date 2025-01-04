# Shaar

Веб-приложение, направленное на улучшение туристического опыта в Бишкеке с использованием современных технологий фронтенд-разработки и интеграции с Google Maps API.

Сайт был разработан за 24 часа в рамках хакатона на мероприятии **IT-Fest** в Бишкеке, организованном мэрией с целью развития молодежи города, включая студентов университетов и колледжей.

---

## Основные зоны проекта

### 1. Туристические маршруты
<img src="./src/assets/md/mapmIni.png" alt="Пример маршрута на карте" width="400" height="700"/>  
<img src="./src/assets/md/mapBig.png" alt="Пример маршрута на карте" width="1920" height="700"/>  

**Описание:**  
- Построение кастомных маршрутов на основе туров.
- Отображение ключевых точек маршрута с полным описанием (время, дистанция, описание).
- Интеграция поиска Google Maps.  

---

### 2. Парковки
<img src="./src/assets/md/parking.png" alt="Карта парковок с полигонами" width="1400" height="620"/> 

**Описание:**  
- Карты с зонами парковки, обозначенными зелёными полигонами.
- Метки на парковках с информацией о стоимости, дистанции и возможностью построить маршрут.
- **Конструктор парковок**: возможность вручную создавать собственные парковочные зоны, рисовать полигоны и добавлять метки без кода.  

---

### 3. События
<img src="./src/assets/md/Снимок экрана 2024-11-23 в 17.43.40.png" alt="Пример страницы календаря" width="1400" height="620"/>  

**Описание:**  
- Страница с календарём ближайших мероприятий в Бишкеке.  
- Интерактивный интерфейс для просмотра и фильтрации событий (функционал в разработке).  

---

### 4. Конструктор парковок
<img src="./src/assets/md/parking.png" alt="Интерфейс конструктора парковок" width="1400" height="620"/>  

**Описание:**  
- Полностью интерактивный инструмент для добавления новых зон парковки.
- Рисование полигонов вручную прямо на карте.
- Добавление пользовательских меток с детальной информацией.  

---

### 5. Регистрация и авторизация
<img src="./src/assets/md/login.png" alt="Логин" width="1400" height="620"/>  
<img src="./src/assets/md/registerMini.png" alt="Логин" width="320" height="550"/> 

Для использования функционала приложения предусмотрены следующие возможности регистрации и логина:

- **JWT Токены** используются для авторизации пользователей.
- Процесс регистрации:
  - Пользователь создаёт аккаунт с помощью email и пароля.
  - После успешной регистрации на сервер отправляется запрос для генерации JWT токена.
- Процесс логина:
  - Пользователь вводит email и пароль.
  - Сервер отправляет JWT токен, который сохраняется в **localStorage**.
  - Этот токен используется для аутентификации на всех последующих запросах.

---

## Технологии и функционал

Приложение построено на **React** с использованием **TypeScript**. Карты реализованы через Google Maps API и визуализированы с помощью **@vis.gl/react-google-maps**. Используются библиотеки для управления состоянием, мультиязычности и работы с запросами.

### Основные зависимости:
- **Google Maps API**
- **Tailwind CSS**
- **React Hook Form**
- **Framer Motion**
- **JWT (JSON Web Tokens)** для аутентификации и авторизации пользователей


## Галерея

Здесь представлены фотографии и скриншоты, иллюстрирующие функционал и дизайн нашего проекта.

### Боковое меню / навигация
<img src="./src/assets/md/sidebar.png" alt="сайдбар" width="400" height="650"/>

### Главное меню
<img src="./src/assets/md/main.png" alt="главное меню" width="1400" height="620"/>

### Страница привествия /welcome
<img src="./src/assets/md/welcome.png" alt="главное меню" width="320" height="650"/>
