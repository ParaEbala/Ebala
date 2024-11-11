// Получаем данные о кампаниях с сервера и отображаем их
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://example.com/api/get-campaigns', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayCampaigns(data);
    })
    .catch(error => {
        console.error('Ошибка загрузки кампаний:', error);
        document.getElementById('campaigns').innerText = 'Не удалось загрузить кампании.';
    });
});

function displayCampaigns(campaigns) {
    const campaignsContainer = document.getElementById('campaigns');

    if (campaigns.length === 0) {
        campaignsContainer.innerText = 'У вас пока нет созданных кампаний.';
        return;
    }

    // Создаем элементы для каждой кампании
    campaigns.forEach(campaign => {
        const campaignElement = document.createElement('div');
        campaignElement.classList.add('campaign-item');

        campaignElement.innerHTML = `
            <h2>${campaign.name}</h2>
            <p>Бюджет: ${campaign.budget} руб.</p>
            <p>Статус: ${campaign.status}</p>
            <button onclick="pauseCampaign('${campaign.id}')">Остановить кампанию</button>
            <button onclick="editCampaign('${campaign.id}')">Редактировать кампанию</button>
        `;

        campaignsContainer.appendChild(campaignElement);
    });
}

// Пример функций для остановки и редактирования кампаний
function pauseCampaign(campaignId) {
    fetch(`https://example.com/api/pause-campaign/${campaignId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(`Кампания "${data.name}" успешно остановлена.`);
        // Обновить список кампаний на странице
        location.reload();
    })
    .catch(error => {
        console.error('Ошибка остановки кампании:', error);
    });
}

function editCampaign(campaignId) {
    // Перенаправление на страницу редактирования кампании
    window.location.href = `edit-campaign.html?campaignId=${campaignId}`;
}
