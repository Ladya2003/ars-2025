# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



привет! мне нужно создать веб-сайт без бэкэнда, которое я буду публиковать на github public repo и через settings/pages буду смотреть результат. я хочу написать сайт подарок моему другу. 

можешь написать его на любом языке, но я предпочту react js, mui, или нативный html, css, js. 

веб-сайт арсений (мой друг) будет открывать на iphone, так что сайт должен быть адаптирован именно под него. 

дизайн должен быть красивым, минималистичным, в темных тонах. можешь 

на главной странице будет label: Что мы говорили во время первого курса, когда на нас наваливалось много проблем? и снизу поле для ввода.

(все вопросы и ответы должны быть в отдельном файлике. в идеале этот файлик как-то спрятать, чтобы арсений не смог его увидеть через публичный репозиторий, но это необязательно - я не хочу сильно замарачиваться).

ответом будет слово: прорвемся в любом регистре.

как только он вводит его и нажимает enter, ему открывается главная страница, которая представляет из себя 3 уровня, который красиво идут друг под другом (опять таки чтобы на телефоне хорошо отображалось). каждый новый уровень закрыт до тех пор, пока не пройдет предыдущий.

1 уровень при нажатии предоставляет вопрос и поле для ввода (красиво сделай дизайн, можешь по центру текст и поле для ввода или как-то иначе). Таких вопрос будет 5 штук. Я их потом сам придумаю, напиши пока что тестовые.
Как только арсений отвечает правильно на все 5 вопросов. ему открывается его первое вознагрождение - фотография его с часами (его мечта купить дорогие часы. фотку подставь любую я сам потом изменю). хорошо сделать красивую анимацию появления фотографии с феерверками. и надпись что эта фотография будет доступна на вкладке вознагрождений (можно сделать боковое меню со всеми вознагрождениями, чтобы заново не проходить все).

2 уровень будет похожего дизайна. только вместе с одинаковым вопросом: Что за песня? будет ниже компонент для проигрыша аудио (подставь тестовое, я потом сам придумаю) и поле для ввода. как только арсений отвечает на все верно, ему открывается вознагрождение - моя собсвтенная песня ему (я опять таки потом сам изменю на свою, вставь любую для теста)

и 3 уровень это сделай мини игру Brick Breaker. Как только он набивает 10 очков то игра спрашивает, ты заслужил финальное вознагрождение. хочет ли он продолжить играть? если нажимает на да, то игра продолжается и рекорд сохраняется в json файлике, если нет или да но через какое-то время проигрывает, то ему открывается вознагрождение - мое собсвтенное видео (вставь для теста любое, я сам подставлю нужное). и в конце когда все вознагрождения пройдены, арсений может перейти на окно со всеми вознагрождениями и там будет статус большими красивыми буквами: КРУТОЙ ЧЕЛ.



Что надо доделать?
1. При прохождении уровня 3, нельзя пройти его снова, пока не перейдешь на главную страницу и не нажмешь на кнопку "начать заново".
2. 