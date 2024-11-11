document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const campaignId = urlParams.get('campaignId');

    // Загрузка данных о кампании для редактирования
    fetch(`https://example.com/api/get-campaign/${campaignId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('campaignName').value = data.name;
        document.getElementById('budget').value = data.budget;
    })
    .catch(error => {
        console.error('Ошибка загрузки данных кампании:', error);
    });

    document.getElementById('editCampaignForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const updatedCampaignData = {
            name: document.getElementById('campaignName').value,
            budget: document.getElementById('budget').value
        };

        // Отправка обновленных данных на сервер
        fetch(`https://example.com/api/edit-campaign/${campaignId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCampaignData)
        })
        .then(response => response.json())
        .then(data => {
            alert(`Кампания "${data.name}" успешно обновлена.`);
            window.location.href = 'dashboard.html';  // Возврат в личный кабинет
        })
        .catch(error => {
            console.error('Ошибка обновления кампании:', error);
        });
    });
});
