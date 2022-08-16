export class Section {
  constructor({ items, renderer }, selector) { //	Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
    this._items = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector); //Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
  }

  renderItems() { //публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element) { // публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
    this._container.prepend(element);
  }
}