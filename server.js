const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware для обработки JSON-запросов
app.use(express.json());

// Раздача статических файлов (например, index.html, styles.css)
app.use(express.static(path.join(__dirname)));

// Маршрут для создания кампании (POST-запрос)
app.post('/api/create-campaign', (req, res) => {
    const { name, budget, audience, ageRange } = req.body;

    // Проверим, что все поля переданы
    if (!name || !budget || !audience || !ageRange) {
        return res.status(400).json({ error: 'Все поля обязательны!' });
    }

    console.log('Получены данные кампании:', { name, budget, audience, ageRange });

    // Возвращаем успешный ответ с сгенерированным ID кампании
    res.json({
        message: 'Кампания успешно создана!',
        campaignId: Math.floor(Math.random() * 10000)  // Случайный ID кампании
    });
});

// Маршрут для получения списка кампаний
app.get('/api/get-campaigns', (req, res) => {
    const campaigns = [
        { id: '1', name: 'Кампания 1', budget: 1000, status: 'ACTIVE' },
        { id: '2', name: 'Кампания 2', budget: 2000, status: 'PAUSED' },
        { id: '3', name: 'Кампания 3', budget: 1500, status: 'ACTIVE' }
    ];
    
    res.json(campaigns);
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
