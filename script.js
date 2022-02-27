const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const allPlayers = () => {
    const inputValue = searchInput.value;

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputValue}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayPlayer(data.player));
}

const displayPlayer = (players) => {
    players.forEach(player => {
        const playerArea = document.getElementById("player-area");
        const div= document.createElement("div");
        div.innerHTML = `
        <div class="card mb-2" style="width: 18rem;">
            <img src="${player.strCutout}" class="card-img-top w-100 h-auto" alt="...">
            <div class="card-body">
                <h3 class="card-title">${player.strPlayer}</h3>
                <h5 class="card-title">${player.strSport}, ${player.strTeam}</h5>
                
                <a href="#" class="btn btn-danger" id="delete-btn">Delete</a>
                <a href="#" class="btn btn-primary" id="details-btn" onclick="details('${player.idPlayer}')">Details</a>
            </div>
        </div>
        `;
        playerArea.appendChild(div);
    });
}

// <p class="card-text">${player.strDescriptionEN}</p>

const details = (details) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${details}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.players[0]));
}

const displayDetails = (info) => {
    const information = document.getElementById("details-area");

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card w-100">
        <img src="${info.strThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title">${info.strPlayer}</h3>
            <h5 class="card-title">${info.strNationality}, ${info.strNumber}</h5>
            <p class="card-text">${info.strDescriptionEN}</p>
        </div>
    </div>
    `;
    information.appendChild(div);
}