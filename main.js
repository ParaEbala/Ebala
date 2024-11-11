document.getElementById('campaignForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const campaignName = document.getElementById('campaignName').value;
    const budget = document.getElementById('budget').value;
    const targetAudience = document.getElementById('targetAudience').value;
    const ageRange = document.getElementById('ageRange').value;

    const campaignData = {
        name: campaignName,
        budget: budget,
        audience: targetAudience,
        ageRange: ageRange
    };

    // Отправляем данные о новой кампании на сервер
    fetch('http://localhost:3000/api/create-campaign', {  // Локальный адрес вместо внешнего
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(campaignData)
  })
  .then(response => response.json())
  .then(result => {
      document.getElementById('result').innerText = `Кампания "${campaignData.name}" успешно создана с ID ${result.campaignId}.`;
  })
  .catch(error => {
      console.error('Ошибка создания кампании:', error);
      document.getElementById('result').innerText = 'Произошла ошибка при создании кампании.';
  });  
});
