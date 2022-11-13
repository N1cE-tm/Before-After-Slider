export class Slider {
	/**
	 * Стандартная функция конструктора для классов
	 * @param {Element|HTMLElement} element - Элемент в котором будет отрисован слайдер
	 * @param {*} state - опции инициализации
	 */
	constructor(element, state = {}) {
		this.slider = element; // Присваеваем элемент к переменной класса, чтобы мы могли получать к нему доступ по всему классу
		this.state = {
			...state,
			width: state.width || 300,
		}; // Присваиваем параметры при инациализации класаа к переменной класса, чтобы был доступ отовсюду

		this.#listen(); // Инициализируем обработчики событий
		this.#reder(this.state); // Отрисовываем данные в DOM
	}

	/**
	 * Обработчик нажатия мыши
	 * @param {MouseEvent} event -  событие мыши
	 */
	mouseDownHendler(event) {
		if (event.target.dataset.type === "resize") {
			this.slider.addEventListener("mousemove", this.moveHendler); // Добавление обработчика события на перемещение
			this.currentClientX = event.clientX; // Запись координаты при нажатии, чтобы потом просчитывать дистанцию
		}
	}

	/**
	 * Обработчик отпускания мыши
	 * @param {MouseEvent} event -  событие мыши
	 */
	mouseUpHendler(event) {
		this.slider.removeEventListener("mousemove", this.moveHendler); // Удаление обработчика события на перемещение
	}

	/**
	 * Обработчик перемещения мыши
	 * @param {MouseEvent} event -  событие мыши
	 */
	moveHendler(event) {
		let newClientWhidtX = this.currentClientX - event.clientX; // Получение разницы между кооржинатами нажатия мыши и перемещения
		this.#update({ width: this.state.width - newClientWhidtX }); // Обновление параметра положения и перерисовка
		this.currentClientX = event.clientX; // Перезапись текущего положения для корректной обработки при повторном вызове функции
	}

	/**
	 * Функция обновления параметров и запуска перерисовки
	 * @param {*} props - новые параметры для ререндера
	 */
	#update(props) {
		this.state = { ...this.state, ...props }; // Объединение старых и новых параметров
		this.#reder(this.state); // Вызов перерисовки
	}

	/**
	 * Инициализация и присвоение обработчиков
	 */
	#listen() {
		this.mouseDownHendler = this.mouseDownHendler.bind(this); //Жесткое присвоение контекста класса к обработикам
		this.mouseUpHendler = this.mouseUpHendler.bind(this); //Жесткое присвоение контекста класса к обработикам
		this.moveHendler = this.moveHendler.bind(this); //Жесткое присвоение контекста класса к обработикам
		this.slider.addEventListener("mousedown", this.mouseDownHendler); // Присвоение обработчика к событию
		this.slider.addEventListener("mouseup", this.mouseUpHendler); // Присвоение обработчика к событию
	}

	/**
	 * Отрисовка шаблона в DOM
	 * @param {*} state - параметры/опции для отрисовки
	 */
	#reder(state) {
		this.slider.innerHTML = `
            <div class="slider">
                <div class="slider__before" style="width:${state.width}px; background-image:url(${state.before})">
                    <div class="slider__resizer" data-type="resize"></div>
                </div>
                <div class="slider__after" style=" background-image:url(${state.after})"></div>
            </div>
    `;
	}
}
