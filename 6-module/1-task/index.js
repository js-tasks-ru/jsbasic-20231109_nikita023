/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.elem.innerHTML = `<thead>
      <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
      </tr>
    </thead>`;
    this.tbody = document.createElement('tbody');
    this.elem.appendChild(this.tbody);

    for (let row of rows) {
      this.addRow(row);
    }
  }
  addRow(row) {
    const tr = document.createElement('tr');
    this.tbody.appendChild(tr);

    tr.innerHTML = `<td>${row.name}</td>
    <td>${row.age}</td>
    <td>${row.salary}</td>
    <td>${row.city}</td>
    <td><button>X</button></td>`;

    const button = tr.querySelector('button');
    button.addEventListener('click', () => {
      tr.remove();
    }, {once: true});

  }
}


