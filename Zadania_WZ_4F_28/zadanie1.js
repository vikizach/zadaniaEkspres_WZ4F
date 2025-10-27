const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded( { extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <ul>
          <li><a href="/owoce">owoce</a></li>
          <li><a href="/warzywa">Warzywa</a></li>
        </ul>
    `);
});

app.get('/owoce', (req, res) => {
    const jedzonko = JSON.parse(fs.readFileSync('jedzonko.json', 'utf-8'));
    res.json(jedzonko.owoce);
});

app.get('/warzywa', (req, res) => {
    const jedzonko = JSON.parse(fs.readFileSync('jedzonko.json', 'utf-8'));
    res.json(jedzonko.warzywa);
});

const PORT = 3000;
app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`));