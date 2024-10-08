const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const Users = require("./models/Users");
const Security = require("./models/Security");
const Fences = require("./models/Fences");
const Repairs = require("./models/Repairs");
const Session = require("./models/Session");

const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const app = express();
const port = 3020;

const JWT_SECRET = '4a9f89a6b5d9c0f2eb3eecf6d34e5b1e5fba65ff57e4c94b92b967d42a28c1f3c1b2eaf2b4c3e8d7bcf2b7dff0de95316dfc341f4d8b90e5f29d8e53b2b2f9e2';

mongoose.connect('mongodb+srv://admin:123zxc34@cluster0.hoxv5bc.mongodb.net/crossplace', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Підключено до MongoDB'))
    .catch(err => console.error('Помилка підключення до MongoDB:', err));


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//create
app.post('/createSecurityItems', async (req, res) => {
    try {
        const newItem = await Security.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Помилка при створенні елемента:', error);
        res.status(500).send('Помилка сервера');
    }
});
//read - site reading also
app.get('/securityItems', async (req, res) => {
    try {
        const securityItems = await Security.find({});
        res.json(securityItems);
    } catch (error) {
        console.error('Помилка при отриманні даних з бази даних:', error);
        res.status(500).send('Помилка сервера');
    }
});
//update
app.put('/updateSecurityItems/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Security.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        console.error('Помилка при оновленні елемента:', error);
        res.status(500).send('Помилка сервера');
    }
});
//delete
app.delete('/deleteSecurityItems/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Security.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Помилка при видаленні елемента:', error);
        res.status(500).send('Помилка сервера');
    }
});

//create FENCES
app.post('/createFenceItems', async (req, res) => {
    try {
        const newItem = await Fences.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Помилка при створенні елемента:', error);
        res.status(500).send('Помилка сервера');
    }
});
//read - site reading also FENCESs
app.get('/fenceItems', async (req, res) => {
    try {
        const securityItems = await Fences.find({});
        res.json(securityItems);
    } catch (error) {
        console.error('Помилка при отриманні даних з бази даних:', error);
        res.status(500).send('Помилка сервера');
    }
});
//update FENCES
app.put('/updateFenceItems/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Fences.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        console.error('Помилка при оновленні елемента:', error);
        res.status(500).send('Помилка сервера');
    }
});
//delete FENCES
app.delete('/deleteFenceItems/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Fences.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Помилка при видаленні елемента:', error);
        res.status(500).send('Помилка сервера');
    }
});

//create REPAIRS
app.post('/createRepairItems', async (req, res) => {
    try {
        const newItem = await Repairs.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Помилка при створенні елемента:', error);
        res.status(500).send('Помилка сервера');
    }
});
//read - site reading also REPAIRS
app.get('/repairItems', async (req, res) => {
    try {
        const repairItems = await Repairs.find({});
        res.json(repairItems);
    } catch (error) {
        console.error('Помилка при отриманні даних з бази даних:', error);
        res.status(500).send('Помилка сервера');
    }
});
//update REPAIRS
app.put('/updateRepairItems/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Repairs.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        console.error('Помилка при оновленні елемента:', error);
        res.status(500).send('Помилка сервера');
    }
});
//delete FENCES
app.delete('/deleteRepairItems/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Repairs.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Помилка при видаленні елемента:', error);
        res.status(500).send('Помилка сервера');
    }
});

//log in CRUD
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const users = await Users.findOne({ email: email });
        if (!users) {
            return res.json({ success: false, message: 'Неверное имя пользователя' });
        }
        const isValidPassword = await Users.findOne({ password: password });
        if (!isValidPassword) {
            return res.json({ success: false, message: 'Неверный пароль' });
        }
        res.json({ success: true, message: 'Успешная аутентификация' });
    } catch (error) {
        console.error('Ошибка при аутентификации:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

//log in SITE
app.post('/log_in', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.json({ success: false, message: 'Неправильне ім`я користувача' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.json({ success: false, message: 'Невірний пароль' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        const userSession = new Session.findOne({ userId: user._id });

        //userSession должен найти в бд юзера и его сессию, и если сессия заэкспайрилась, заменить на новый токен
        //который потом нужно перезаписать в локалсторедже   

        res.json({ success: true, message: 'Успішна автентифікація', username: user.username, token });
    } catch (error) {
        console.error('Ошибка при аутентификации:', error);
        res.status(500).json({ success: false, message: 'Помилка сервера' });
    }
});

//register on the SITEs
app.post('/register', async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Користувач із такою поштою вже існує' });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new Users({
            username: name,
            email: email,
            phoneNumber: phoneNumber,
            password: hashedPassword
        });
        await newUser.save();


        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'Strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        // }); 

        //записывать в таблицу сессий в бд токен сессии юзера, userId и время жизни

        //const validTo = new Date().now() + (7 * 24 * 60 * 60 * 1000); - время до которого активен токен
        //new Date().now() >== validTo -> validTo = new validTo;

        res.json({ success: true, message: 'Реєстрація пройшла успішно', token });
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        res.status(500).json({ success: false, message: 'Помилка сервера' });
    }
});

app.get('/', async (req, res) => {
    //фронт ищет есть ли токен в локалсторедже, если есть - токен отправляется на сервак и сравнивает с тем, который в бд
    //если срок не истёк - сервре отвечает данными пользователя
    //если срок истёк - в таком случае стандартная загрузка страницы как анон юзер и старый токен должен удалиться из локалсторедж
});

app.listen(port, () => {
    console.log(`Сервер запущено на порті ${port}`);
});
