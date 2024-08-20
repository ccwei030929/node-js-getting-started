// public/script.js
fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        renderTable1(data.table1);
        renderTable2(data.table2);
    });

function renderTable1(data) {
    const table = document.getElementById('table1');
    const headers = Object.keys(data[0]);
    
    // Create header row
    let headerRow = '<tr>';
    headers.forEach(header => {
        headerRow += `<th>${header}</th>`;
    });
    headerRow += '</tr>';
    table.innerHTML = headerRow;

    // Create data rows
    data.forEach(row => {
        let dataRow = '<tr>';
        headers.forEach(header => {
            dataRow += `<td>${row[header]}</td>`;
        });
        dataRow += '</tr>';
        table.innerHTML += dataRow;
    });
}

function renderTable2(data) {
    const table = document.getElementById('table2');
    Object.entries(data).forEach(([category, value]) => {
        const row = `<tr><td>${category}</td><td>${typeof value === 'number' ? value.toFixed(2) : value}</td></tr>`;
        table.innerHTML += row;
    });
}