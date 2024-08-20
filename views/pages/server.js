const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/data', (req, res) => {
    const results = [];
    fs.createReadStream('table1.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const table2 = processTable2(results);
            res.json({ table1: results, table2 });
        });
});

function processTable2(data) {
    return {
        Alpha: parseInt(data[4].A) + parseInt(data[19].A),
        Beta: parseFloat(data[14].A) / parseFloat(data[6].A),
        Charlie: parseFloat(data[12].A) * parseFloat(data[11].A)
    };
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
