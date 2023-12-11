function highlight(table) {
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    
    const availableValue = row.cells[3].dataset['available'];
    if (availableValue === 'true') {
      row.classList.add('available');
    } else if (availableValue === 'false') {
      row.classList.add('unavailable');
    } else if (availableValue === undefined) {
      row.setAttribute('hidden', 'true');    
    }

    if (row.cells[2].innerText === 'm') {
      row.classList.add('male');
    } else if (row.cells[2].innerText === 'f') {
      row.classList.add('female');
    }

    if (+row.cells[1].innerText < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
