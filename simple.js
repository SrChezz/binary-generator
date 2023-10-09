var TABLE = document.getElementById('table');
var BTN = document.getElementById('export-btn');
var EXPORT = document.getElementById('export');
let DOWNLOAD = document.getElementById('download');

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

        data.push(`${neumonico}${operando}`);
    });

    data = [
        "00110100",
        "01110000",
        "00110000",
        "01000000",
        "00100001",
        "01000000",
        "11000000",
    ];

    // Convierte los números binarios a caracteres ASCII
    let pData = '';
    data.forEach(function (bin) {
        const decimalValue = parseInt(bin, 2);
        pData += String.fromCharCode(decimalValue);
    });

    console.log(data.join(" "));
    console.log(pData);

    // Muestra los resultados en el elemento EXPORT
    EXPORT.textContent = JSON.stringify(data.join(" ") + '\n' + pData);

    const link = document.createElement("a");
    const byteArray = new Uint8Array(pData.length);
    for (let i = 0; i < pData.length; i++) {
        byteArray[i] = pData.charCodeAt(i);
    }
    const file = new Blob([byteArray], { type: "application/octet-stream" });
    link.href = URL.createObjectURL(file);
    link.download = `${name}.bin`;
    link.click();
    URL.revokeObjectURL(link.href);



});

