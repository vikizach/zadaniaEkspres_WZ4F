const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <form method="POST" action="/">
            <label for="login">Login:</label><br>
            <input type="text" id="login" name="login"><br>
            <label for="password">Hasło:</label><br>
            <input type="text" id="password" name="password"> <br>
             <button type="submit">Zarejestruj się</button> <br>
        </form>
        `);
});

function isPasswordStrong(password){
    if(password.length < 8){
        return 'Hasło musi mieć co najmniej 8 znaków';
    }
    if(!/[A-Z]/.test(password)){
        return 'Hasło musi posiadać co najmniej 1 dużą literę';
    }
    if(!/[a-z]/.test(password)){
        return 'Hasło musi posiadać co najmniej 1 małą literkę :3';
    }
    if(!/[0-9]/.test(password)){
        return 'Hasło musi posiadać co najmniej 1 cyfrę';
    }
    if(!/[!@#$%^&*-]/.test(password)){
        return 'Hasło musi zawierać co najmniej 1 znak';
    }
    return true;
}

app.post('/', (req, res) => {

    const isOkay = isPasswordStrong(req.body.password);

    if(isOkay !== true){
    return res.send(`${isOkay}`);
    }

    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    data.push({id: data.length + 1, ...req.body});
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
    res.send(`Your account has been created ${req.body.login}! <br><a href="/">Go back</a>`);
});

const PORT = 3001;
app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`));

