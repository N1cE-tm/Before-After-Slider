import { Slider } from "./slider";

// Получение root элемента
const app = document.querySelector("#app");

// Инициализация слайдера
const slider = new Slider(app, {
	before: "/2nd.jpg",
	after: "/1st.jpg",
});
