const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send(`
        <p>Witaj w poradniku!</p>
        <ul>
          <li><a href="/characters">Postacie</a></li>
          <li><a href="/recipes">Przepisy</a></li>
        </ul>
    `);
});

app.get('/characters', (req, res)=> {
    res.send("*Tutaj są fajne postacie*");
})

app.get('/recipes', (req, res) => {
    res.send("*Tutaj są fajne przepisy*");
});

const PORT = 3003;
app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`));