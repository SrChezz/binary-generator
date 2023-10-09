var TABLE = document.getElementById('table');
var BTN = document.getElementById('export-btn');
var EXPORT = document.getElementById('export');

document.querySelector('.table-add').addEventListener('click', function () {
  var clone = TABLE.querySelector('tr.hide').cloneNode(true);
  clone.classList.remove('hide');
  TABLE.querySelector('tbody').appendChild(clone);

  attachEventListeners(clone);
});

function attachEventListeners(row) {
  var removeButton = row.querySelector('.table-remove');
  var upButton = row.querySelector('.table-up');
  var downButton = row.querySelector('.table-down');

  removeButton.addEventListener('click', function () {
    var row = this.parentNode.parentNode;
    row.parentNode.removeChild(row);
  });

  upButton.addEventListener('click', function () {

    if (row.rowIndex === 1) return; // No subir por encima de la cabecera
    row.parentNode.insertBefore(row, row.previousSibling);
  });

  downButton.addEventListener('click', function () {


    row.parentNode.insertBefore(row.nextElementSibling, row);
  });
}


var tableRemoveButtons = document.querySelectorAll('.table-remove');

tableRemoveButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var row = this.parentNode.parentNode;
    row.parentNode.removeChild(row);
  });
});

var tableUpButtons = document.querySelectorAll('.table-up');

tableUpButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var row = this.parentNode.parentNode;
    if (row.rowIndex === 1) return; // Don't go above the header
    row.parentNode.insertBefore(row, row.previousSibling);
  });
});

var tableDownButtons = document.querySelectorAll('.table-down');

tableDownButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var row = this.parentNode.parentNode;
    row.parentNode.insertBefore(row.nextElementSibling, row);
  });
});

BTN.addEventListener('click', function () {
  let rows = TABLE.querySelectorAll('tr:not(.hide)');
  let name = document.getElementById('name').value;
  let data = [];

  // Turn all existing rows into a loopable array
  Array.from(rows).slice(1).forEach(function (row) {

    databit = row.querySelectorAll('select')

    neumonico = databit[0].value;
    operando = databit[1].value;

    data.push(neumonico);
    data.push(operando);
  });

  EXPORT.textContent = JSON.stringify(data.join(" "));

  let cleanData = { data: data.join("") };


  fetch("/download", {
    method: "POST", // or 'PUT'
    body: JSON.stringify(cleanData), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    // .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
});
