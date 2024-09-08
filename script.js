const searchInput = document.getElementById('team-search');
const searchButton = document.getElementById('search-button');
const filterButton = document.getElementById('filter-button');
const backButton = document.getElementById('back-button');
const teamInfoContainer = document.getElementById('team-info-container');
const teamListContainer = document.getElementById('team-list-container');

let isFilterButtonActive = false; // Estado para o botão de filtro

// Função para buscar um time pelo nome
function searchTeam(teamName) {
    const foundTeam = teams.find(team => team.nome.toLowerCase().includes(teamName.toLowerCase()));
    if (foundTeam) {
        renderTeamInfo(foundTeam);
    } else {
        teamInfoContainer.innerHTML = '<p>Time não encontrado.</p>';
    }
    teamInfoContainer.style.display = 'block';
    teamListContainer.style.display = 'none';
    backButton.style.display = 'inline-block'; // Mostrar o botão de voltar
    filterButton.style.display = 'none'; // Esconder o botão de filtro
}

// Função para renderizar as informações do time
function renderTeamInfo(team) {
    const teamInfoHtml = `
        <div class="team-card">
            <div class="team-info-left">
                <img src="${team.imagemTime}" alt="Imagem do time ${team.nome}" class="logo">
                <h2>${team.nome}</h2>
                <h3>${team.alcunha}</h3>
            </div>
            <div class="team-info-right">
                <p><strong>História: </strong> ${team.historia}</p>
                <p><strong>Ano de Inauguração: </strong> ${team.anoInauguracao}</p>
                <p><strong>Presidente do Time: </strong>${team.presidenteTime}</p>
                <p><strong>Treinador Atual: </strong>${team.treinadorAtual}</p>
                <p><strong>Trecho do Hino: </strong><a href="${team.linkHino}" target="_black">Hino</a></p>
                <p><a href="${team.linkMaisInfo}" target="_blank">Mais Informações</a></p>
            </div>
        </div>
        <div class="info-cards">
            <div class="info-card">
                <img src="${team.imagemEstadio}" alt="Imagem do estádio ${team.nomeEstadio}" class="estadio">
                <h3>${team.nomeEstadio}</h3>
                <p>Capacidade: ${team.capacidade}</p>
            </div>
            <div class="info-card">
                <img src="${team.imagemMascote}" alt="Imagem do mascote ${team.mascote}" class="mascote">
                <h3>${team.mascote}</h3>
            </div>
            <div class="info-card">
                <p><strong>Títulos:</strong></p>
                <p>Títulos Estaduais: ${team.titulos.estadual}</p>
                <p>Títulos Nacionais: ${team.titulos.nacional}</p>
                <p>Títulos Internacionais: ${team.titulos.internacional}</p>
                <p><a href="${team.linkSabiaMais}" target="_blank">Sabia Mais</a></p>
            </div>
        </div>
    `;
    teamInfoContainer.innerHTML = teamInfoHtml;
}

// Função para mostrar a lista de times
function showTeamList() {
    if (!isFilterButtonActive) {
        const teamListHtml = teams.map(team => `<li><a href="#" data-team-name="${team.nome}">${team.nome}</a></li>`).join('');
        teamListContainer.innerHTML = `<ul>${teamListHtml}</ul>`;
        teamListContainer.style.display = 'block';
        teamInfoContainer.style.display = 'none';
        filterButton.style.display = 'none'; // Esconder o botão de filtro quando a lista é exibida
        backButton.style.display = 'inline-block'; // Mostrar o botão de voltar
        isFilterButtonActive = true;

        // Adicionar o evento de clique aos links da lista
        teamListContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Evita o comportamento padrão do link
                const teamName = event.target.getAttribute('data-team-name');
                searchTeam(teamName); // Chama a função de busca com o nome do time
            });
        });
    } else {
        teamListContainer.style.display = 'none';
        filterButton.style.display = 'inline-block'; // Mostrar o botão de filtro novamente
        backButton.style.display = 'none'; // Esconder o botão de voltar
        isFilterButtonActive = false;
    }
}

// Função para voltar ao menu inicial
function resetToMenu() {
    teamInfoContainer.style.display = 'none';
    teamListContainer.style.display = 'none';
    backButton.style.display = 'none'; // Esconder o botão de voltar
    filterButton.style.display = 'inline-block'; // Mostrar o botão de filtro
    searchInput.value = ''; // Limpar o campo de busca
    document.body.style.backgroundImage = 'url("img/background_body.jpg")'; // Reaplicar a imagem de fundo
}

// Eventos dos botões
searchButton.addEventListener('click', () => {
    const teamName = searchInput.value.trim();
    if (teamName) {
        searchTeam(teamName);
    } else {
        alert("Por favor, insira o nome de um time.");
    }
});

filterButton.addEventListener('click', showTeamList);
backButton.addEventListener('click', resetToMenu);

// Função para carregar as informações do time com base na URL
function loadTeamFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const teamName = urlParams.get('team');
    if (teamName) {
        const foundTeam = teams.find(team => team.nome.toLowerCase() === teamName.toLowerCase());
        if (foundTeam) {
            renderTeamInfo(foundTeam);
            backButton.style.display = 'inline-block'; // Mostrar o botão de voltar
            filterButton.style.display = 'none'; // Esconder o botão de filtro
        } else {
            teamInfoContainer.innerHTML = '<p>Time não encontrado.</p>';
            teamInfoContainer.style.display = 'block';
        }
        document.body.style.backgroundImage = 'none'; // Remover a imagem de fundo ao exibir o time
    } else {
        // Garantir que ao carregar a página inicial, o estado esteja correto
        resetToMenu();
    }
}

// Chama a função para carregar o time baseado na URL
window.addEventListener('load', loadTeamFromURL);
