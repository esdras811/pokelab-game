// =================================================================
// 1. BASE DE DADOS E CONFIGURAÇÃO
// Agora todos os Pokémons têm o ID numérico correto para a imagem
// =================================================================

const INITIAL_POKEMONS = {
    // Kanto
    'bulbasaur': { id: 1, name: 'Bulbasaur', types: ['grass', 'poison'], description: 'Um Pokémon semente que armazena energia solar. Ele cresce com uma semente nas costas desde o nascimento.' },
    'charmander': { id: 4, name: 'Charmander', types: ['fire'], description: 'Prefere lugares quentes. Quando chove, vapor é expelido da ponta de sua cauda.' },
    'squirtle': { id: 7, name: 'Squirtle', types: ['water'], description: 'Quando ele retrai seu longo pescoço em sua concha, ele expele água com força surpreendente.' },
    // Johto
    'chikorita': { id: 152, name: 'Chikorita', types: ['grass'], description: 'Um aroma suave e agradável se espalha da folha em sua cabeça. É dócil e adora tomar sol.' },
    'cyndaquil': { id: 155, name: 'Cyndaquil', types: ['fire'], description: 'É tímido, e sempre se enrola em uma bola. Se atacado, suas costas queimam em chamas para se defender.' },
    'totodile': { id: 158, name: 'Totodile', types: ['water'], description: 'É pequeno, mas seu maxilar é muito forte. Ele morde qualquer coisa que se mova.' },
    // Hoenn
    'treecko': { id: 252, name: 'Treecko', types: ['grass'], description: 'Tem pequenos ganchos nas solas dos pés que lhe permitem escalar paredes e tetos sem cair.' },
    'torchic': { id: 255, name: 'Torchic', types: ['fire'], description: 'Este Pokémon tem um saco de chamas dentro de sua barriga, que está sempre quente. Acariciá-lo é satisfatório.' },
    'mudkip': { id: 258, name: 'Mudkip', types: ['water', 'ground'], description: 'A barbatana em sua cabeça age como um radar. Ele tem a força para esmagar pedras maiores do que ele.' },
    // Sinnoh
    'turtwig': { id: 387, name: 'Turtwig', types: ['grass'], description: 'Faz a fotossíntese com a casca nas costas. Endurece quando bebe água. Gosta de luz solar.' },
    'chimchar': { id: 390, name: 'Chimchar', types: ['fire'], description: 'Ágil e prefere subir em penhascos íngremes. Seu gás inflamável é aceso pela ponta de sua cauda.' },
    'piplup': { id: 393, name: 'Piplup', types: ['water'], description: 'Por ser muito orgulhoso, ele odeia aceitar comida das pessoas. Vive em regiões muito frias.' },
    // Especiais
    'pikachu': { id: 25, name: 'Pikachu', types: ['electric'], description: 'Este Pokémon tem bolsas elétricas nas bochechas. Quando se sente ameaçado, descarrega eletricidade em um ataque forte.' },
    'eevee': { id: 133, name: 'Eevee', types: ['normal'], description: 'Um Pokémon raro que se adapta facilmente a qualquer ambiente. Ele tem a capacidade de evoluir de várias formas.' }
};

const GENERATION_POOL = [
    { name: 'Pidgeotto', id: 17, types: ['normal', 'flying'] },
    { name: 'Nidoqueen', id: 31, types: ['poison', 'ground'] },
    { name: 'Vulpix', id: 37, types: ['fire'] },
    { name: 'Poliwag', id: 60, types: ['water'] },
    { name: 'Machop', id: 66, types: ['fighting'] },
    { name: 'Geodude', id: 74, types: ['rock', 'ground'] },
    { name: 'Gastly', id: 92, types: ['ghost', 'poison'] },
    { name: 'Onix', id: 95, types: ['rock', 'ground'] },
    { name: 'Electabuzz', id: 125, types: ['electric'] },
    { name: 'Jynx', id: 124, types: ['ice', 'psychic'] },
    { name: 'Snorlax', id: 143, types: ['normal'] },
    { name: 'Dratini', id: 147, types: ['dragon'] },
    { name: 'Mew', id: 151, types: ['psychic'] },
    { name: 'Steelix', id: 208, types: ['steel', 'ground'] },
    { name: 'Tyranitar', id: 248, types: ['rock', 'dark'] },
    { name: 'Zangoose', id: 335, types: ['normal'] },
    { name: 'Flygon', id: 330, types: ['ground', 'dragon'] },
    { name: 'Metagross', id: 376, types: ['steel', 'psychic'] },
    { name: 'Luxio', id: 404, types: ['electric'] },
    { name: 'Garchomp', id: 445, types: ['dragon', 'ground'] }
];

let selectedInitial = null;

// =================================================================
// 2. FUNÇÕES DE RENDERIZAÇÃO
// =================================================================

function renderDescription(pokemon) {
    const descriptionContent = document.getElementById('description-content');
    
    const typeBadges = pokemon.types.map(type => 
        `<span class="type-badge type-${type}">${type}</span>`
    ).join('');

    const pokeId = pokemon.id; 

    descriptionContent.innerHTML = `
        <div class="pokemon-info">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png" alt="${pokemon.name}" class="large-sprite">
            <div class="pokemon-details">
                <h4>${pokemon.name}</h4>
                <p><strong>Tipo(s):</strong> ${typeBadges}</p>
                <p>${pokemon.description}</p>
            </div>
        </div>
    `;
}

/**
 * Cria o HTML do card para a equipe final, usando o ID numérico
 */
function createTeamCardHTML(pokemon, index) {
    const typeBadges = pokemon.types.map(type => 
        `<span class="type-badge type-${type}">${type}</span>`
    ).join('');

    const imageId = pokemon.id;
    const isInitial = pokemon.isInitial ? ' (Inicial)' : '';
    
    // CORREÇÃO FINAL: Garante que a URL da imagem usa o ID numérico correto
    return `
        <div class="pokemon-team-card">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageId}.png" alt="${pokemon.name}">
            <h4>#${index}: ${pokemon.name}</h4>
            <div class="types">${typeBadges}</div>
            <p>${isInitial}</p>
        </div>
    `;
}

// =================================================================
// 3. LÓGICA DO ALGORITMO DE GERAÇÃO
// =================================================================

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateTeam(initialId) {
    const initialPokemon = INITIAL_POKEMONS[initialId];
    
    // Inclui o ID numérico na estrutura
    const team = [{ 
        id: initialPokemon.id, 
        name: initialPokemon.name, 
        types: initialPokemon.types, 
        isInitial: true 
    }];
    
    let coveredTypes = new Set(initialPokemon.types);
    const neededTypes = ['fire', 'water', 'grass', 'electric', 'flying', 'ground', 'rock', 'fighting', 'psychic', 'normal'];
    
    let attempts = 0;
    
    while (team.length < 6 && attempts < 50) {
        attempts++;
        
        let candidatePokemon = null;
        const availablePokemons = GENERATION_POOL.filter(p => 
            !team.some(t => t.id === p.id) 
        );

        const missingTypes = neededTypes.filter(type => !coveredTypes.has(type));

        if (missingTypes.length > 0) {
            const focusedPool = availablePokemons.filter(p => 
                p.types.some(type => missingTypes.includes(type))
            );
            
            if (focusedPool.length > 0) {
                candidatePokemon = getRandomItem(focusedPool);
            }
        }
        
        if (!candidatePokemon) {
            candidatePokemon = getRandomItem(availablePokemons);
        }

        if (candidatePokemon) {
            team.push(candidatePokemon);
            candidatePokemon.types.forEach(type => coveredTypes.add(type));
        }
    }
    
    return team;
}

// =================================================================
// 4. MANIPULADORES DE EVENTOS
// =================================================================

/**
 * Lida com o clique em um card de Pokémon inicial.
 * Faz a limpeza do time gerado (se houver) e mostra a descrição.
 */
function handleInitialSelection(event) {
    let targetCard = event.target.closest('.pokemon-card');
    if (!targetCard) return;

    const initialId = targetCard.dataset.pokemonId;
    const initialInfo = INITIAL_POKEMONS[initialId];

    // 1. Remove a classe 'selected' de todos
    document.querySelectorAll('.pokemon-card').forEach(card => {
        card.classList.remove('selected');
    });

    // 2. Esconde a seção do time gerado (LIMPEZA IMEDIATA)
    document.getElementById('time-gerado').classList.add('hidden');
    document.getElementById('escolha-inicial').classList.remove('hidden');

    
    targetCard.classList.add('selected');

    
    selectedInitial = initialId;
    document.getElementById('gerar-time-btn').disabled = false;
    
    
    renderDescription(initialInfo);
}

function handleGenerateTeam() {
    if (!selectedInitial) return;

    const finalTeam = generateTeam(selectedInitial);
    const equipeCardsContainer = document.getElementById('equipe-cards');
    equipeCardsContainer.innerHTML = ''; 

    finalTeam.forEach((pokemon, index) => {
        
        equipeCardsContainer.innerHTML += createTeamCardHTML(pokemon, index + 1);
    });

    
    document.getElementById('escolha-inicial').classList.add('hidden');
    document.getElementById('time-gerado').classList.remove('hidden');
}

function handleReset() {
    selectedInitial = null;
    document.getElementById('gerar-time-btn').disabled = true;
    
    document.querySelectorAll('.pokemon-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    document.getElementById('time-gerado').classList.add('hidden');
    document.getElementById('escolha-inicial').classList.remove('hidden');

    document.getElementById('description-content').innerHTML = '<p>Passe o mouse ou clique em um Pokémon para ver sua descrição e tipo aqui.</p>';
}





document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.pokemon-opcoes').forEach(container => {
        container.addEventListener('click', handleInitialSelection);
    });

    document.getElementById('gerar-time-btn').addEventListener('click', handleGenerateTeam);
    
    document.getElementById('reset-btn').addEventListener('click', handleReset);
    
    // Configura o hover
    document.querySelectorAll('.pokemon-card').forEach(card => {
        const initialId = card.dataset.pokemonId;
        const initialInfo = INITIAL_POKEMONS[initialId];
        
        card.addEventListener('mouseover', () => {
            renderDescription(initialInfo);
        });

        card.addEventListener('mouseout', () => {
            // Só limpa se o Pokémon que o mouse saiu NÃO for o selecionado no momento
            if (selectedInitial !== initialId) {
                 document.getElementById('description-content').innerHTML = '<p>Passe o mouse ou clique em um Pokémon para ver sua descrição e tipo aqui.</p>';
            }
        });
    });
});