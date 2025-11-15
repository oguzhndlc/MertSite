async function loadCards() {
      try {
        const response = await fetch('/.netlify/functions/getCards'); // Function URL
        if (!response.ok) throw new Error('Veri çekilemedi');

        const cards = await response.json();
        const container = document.getElementById('icerikAlani');

        cards.forEach(card => {
          // Card elementini oluştur
          const col = document.createElement('div');
          col.className = 'col-md-4 mb-4';

          col.innerHTML = `

            <div class="card" style="width: 17rem; height: 24rem;">
              <div style="width: 100%; height:auto; display: flex; justify-content: center;">
                <img src="${card.photo_url}" class="card-img-top" style="width: max-content; height: 12rem;" alt="...">
              </div>            
              <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.example}</p>
                <a href="#" class="btn btn-primary" >İncele</a>
              </div>
            </div>
          `;

          container.appendChild(col);
        });
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    }

    loadCards();