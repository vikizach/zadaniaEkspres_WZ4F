const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <ul>
          <li><a href="/arty">Artykuły</a></li>
          <li><a href="/add">Dodaj nowy</a></li>
        </ul>
    `);
});

app.get('/arty', (req, res) => {
    const data = JSON.parse(fs.readFileSync('dataZad4.json', 'utf-8'));
    let artykulHtml
    for(let i = 0; i < data.artykuly.length; i++){
        const art = data.artykuly[i];
        artykulHtml += `<p><a href="/arty/${art.tytul}">${art.tytul}</a></p>`;
    }

    res.send(artykulHtml);
});

app.get('/arty/:tytul', (req, res) => {
    const tytul = req.params.tytul;
    const data = JSON.parse(fs.readFileSync('dataZad4.json', 'utf-8'));
    const twojArt = data.artykuly.find(function(artykul) {
        return artykul.tytul === tytul;
    });

     res.send(`
        <h1>${twojArt.tytul}</h1>
        <p>${twojArt.tresc}</p>
        `);

});

app.get('/add', (req, res) => {
    res.send(`
        <form method="POST" action="/add">
            <label for="tytul">Tytuł:</label><br>
            <input type="text" id="tytul" name="tytul"><br>
             <label for="tresc">Treść:</label><br>
             <textarea name="tresc" id="tresc"></textarea>
             <button type="submit">Dodaj</button> <br>
        </form>
    `);
});

app.post('/add', (req, res) =>{
    const data = JSON.parse(fs.readFileSync('dataZad4.json', 'utf-8'));
    data.artykuly.push({id: data.artykuly.length + 1, ...req.body});
    fs.writeFileSync('dataZad4.json', JSON.stringify(data, null, 2));
});

const PORT = 3002;
app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`));