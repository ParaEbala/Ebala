document.addEventListener('DOMContentLoaded', function() {
  console.log('Загрузка кампаний...');

  // Запрос на локальный сервер для получения списка кампаний
  fetch('http://localhost:3000/api/get-campaigns', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      // Проверим, что ответ успешный (код 200-299)
      if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();  // Преобразуем ответ в JSON
  })
  .then(data => {
      // Проверка на наличие данных
      if (!data || data.length === 0) {
          document.getElementById('campaigns').innerText = 'У вас пока нет созданных кампаний.';
      } else {
          displayCampaigns(data);  // Отображение кампаний
      }
  })
  .catch(error => {
      console.error('Ошибка загрузки кампаний:', error);
      document.getElementById('campaigns').innerText = 'Не удалось загрузить кампании.';
  });
});

function displayCampaigns(campaigns) {
  const campaignsContainer = document.getElementById('campaigns');

  campaigns.forEach(campaign => {
      const campaignElement = document.createElement('div');
      campaignElement.classList.add('campaign-item');

      // Шаблон для отображения информации о кампании
      campaignElement.innerHTML = `
          <h2>${campaign.name}</h2>
          <p>Бюджет: ${campaign.budget}</p>
          <p>Статус: ${campaign.status}</p>
          <button onclick="pauseCampaign('${campaign.id}')">Остановить кампанию</button>
          <button onclick="editCampaign('${campaign.id}')">Редактировать кампанию</button>
      `;

      campaignsContainer.appendChild(campaignElement);  // Добавляем кампанию в контейнер
  });
}

// Функции заглушки для управления кампаниями
function pauseCampaign(campaignId) {
  console.log(`Остановка кампании с ID: ${campaignId}`);
  // Здесь может быть вызов для остановки кампании на сервере
}

function editCampaign(campaignId) {
  console.log(`Редактирование кампании с ID: ${campaignId}`);
  // Здесь может быть вызов для редактирования кампании
}
