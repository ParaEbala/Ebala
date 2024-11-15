const express = require('express');
const app = express();
const campaigns = [];  // Имитация хранилища кампаний

// Middleware для обработки JSON запросов
app.use(express.json());

// Получение всех кампаний
app.get('/api/get-campaigns', (req, res) => {
    res.json(campaigns);
});

// Остановка кампании по ID
app.post('/api/pause-campaign/:id', (req, res) => {
    const campaignId = req.params.id;
    const campaign = campaigns.find(c => c.id === campaignId);

    if (campaign) {
        campaign.status = 'PAUSED';
        res.json(campaign);
    } else {
        res.status(404).json({ error: 'Кампания не найдена' });
    }
});

// Редактирование кампании (заглушка)
app.post('/api/edit-campaign/:id', (req, res) => {
    const campaignId = req.params.id;
    const updatedData = req.body;

    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
        Object.assign(campaign, updatedData);
        res.json(campaign);
    } else {
        res.status(404).json({ error: 'Кампания не найдена' });
    }
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
