const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Хранилище для кампаний (вместо базы данных)
let campaigns = [];

// Middleware для обработки JSON
app.use(express.json());

// Раздача статических файлов (например, HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Маршрут для получения списка кампаний
app.get('/api/get-campaigns', (req, res) => {
    res.json(campaigns);  // Возвращаем список всех кампаний
});

// Маршрут для создания кампании
app.post('/api/create-campaign', (req, res) => {
    const { name, budget, audience, ageRange } = req.body;

    if (!name || !budget || !audience || !ageRange) {
        return res.status(400).json({ error: 'Все поля обязательны!' });
    }

    // Создаём новую кампанию
    const newCampaign = {
        id: Math.floor(Math.random() * 10000).toString(),  // Случайный ID
        name,
        budget,
        audience,
        ageRange,
        status: 'ACTIVE'  // Новая кампания всегда активна
    };

    campaigns.push(newCampaign);  // Добавляем кампанию в список
    console.log('Кампания создана:', newCampaign);  // Лог успешного создания
    res.json(newCampaign);  // Возвращаем созданную кампанию
});

// Маршрут для редактирования кампании
app.put('/api/edit-campaign/:id', (req, res) => {
    const campaignId = req.params.id;
    const { name, budget, audience, ageRange, status } = req.body;

    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) {
        return res.status(404).json({ error: 'Кампания не найдена!' });
    }

    // Обновляем данные кампании
    if (name) campaign.name = name;
    if (budget) campaign.budget = budget;
    if (audience) campaign.audience = audience;
    if (ageRange) campaign.ageRange = ageRange;
    if (status) campaign.status = status;

    res.json(campaign);  // Возвращаем обновлённую кампанию
});

// Маршрут для удаления кампании
app.delete('/api/delete-campaign/:id', (req, res) => {
    const campaignId = req.params.id;

    // Фильтруем список кампаний, исключая ту, что нужно удалить
    campaigns = campaigns.filter(c => c.id !== campaignId);

    res.json({ message: 'Кампания удалена успешно!' });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
