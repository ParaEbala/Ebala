(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Загрузка кампаний...');

        // Запрос на локальный сервер для получения списка кампаний
        fetch('http://localhost:3000/api/get-campaigns', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                document.getElementById('campaigns').innerText = 'У вас пока нет созданных кампаний.';
            } else {
                displayCampaigns(data);  // Отображаем кампании
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки кампаний:', error);
            document.getElementById('campaigns').innerText = 'Не удалось загрузить кампании.';
        });
    });

    // Функция для отображения списка кампаний
    function displayCampaigns(campaigns) {
        const campaignsContainer = document.getElementById('campaigns');
        campaignsContainer.innerHTML = '';  // Очищаем контейнер

        campaigns.forEach(campaign => {
            const campaignElement = document.createElement('div');
            campaignElement.classList.add('campaign-item');

            // Шаблон для отображения информации о кампании
            campaignElement.innerHTML = `
                <h2>${campaign.name}</h2>
                <p>Бюджет: ${campaign.budget} $</p>
                <p>Целевая аудитория: ${campaign.audience}</p>
                <p>Возраст: ${campaign.ageRange}</p>
                <p>Статус: ${campaign.status}</p>
                <button onclick="editCampaign('${campaign.id}')">Редактировать кампанию</button>
                <button onclick="deleteCampaign('${campaign.id}')">Удалить кампанию</button>
            `;

            campaignsContainer.appendChild(campaignElement);
        });
    }

    // Функция для удаления кампании
    window.deleteCampaign = function(campaignId) {
        if (confirm('Вы уверены, что хотите удалить кампанию?')) {
            fetch(`http://localhost:3000/api/delete-campaign/${campaignId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(result => {
                console.log(result.message);
                location.reload();  // Перезагружаем страницу после удаления
            })
            .catch(error => console.error('Ошибка удаления кампании:', error));
        }
    };

    // Функция для редактирования кампании
    window.editCampaign = function(campaignId) {
        const newName = prompt('Введите новое название кампании');
        const newBudget = prompt('Введите новый бюджет');
        const newAudience = prompt('Введите новую целевую аудиторию');
        const newAgeRange = prompt('Введите новый возрастной диапазон');
        const newStatus = prompt('Введите новый статус (ACTIVE/PAUSED)');

        fetch(`http://localhost:3000/api/edit-campaign/${campaignId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                budget: newBudget,
                audience: newAudience,
                ageRange: newAgeRange,
                status: newStatus
            })
        })
        .then(response => response.json())
        .then(updatedCampaign => {
            console.log('Кампания обновлена:', updatedCampaign);
            location.reload();  // Перезагружаем страницу после редактирования
        })
        .catch(error => console.error('Ошибка редактирования кампании:', error));
    };
})();
