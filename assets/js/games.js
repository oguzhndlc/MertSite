const gamesList = document.getElementById("gamesList");

function cardLoad(game){
gamesList.innerHTML+=`<li><a href="${game.link}">
  <div class="myth-card">
    <div class="myth-wrapper">
      <img src="${game.cover}" class="myth-cover-image"alt="${game.name}" />
    </div>
    <img src="${game.title}" class="myth-title" />
    <img src="${game.character}" class="myth-character" />
  </div>
</a>
</li>`;}



fetch("/pages/games/games.json")
  .then(response => response.json())
  .then(games => {
    for(let i =0;i<games.length;++i){
    cardLoad(games[i]);
}
  })
  .catch(error => {
    console.error("JSON yüklenemedi:", error);
  });