class Random {
    static getInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
function createFighterCard(fighter) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.addEventListener('click', function () {
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');
            selectedFighters = selectedFighters.filter(selected => selected.name !== fighter.name);
        } else if (document.querySelectorAll('.selected').length < 2) {
            this.classList.add('selected');
            selectedFighters.push(fighter);
            if (selectedFighters.length === 2) {
                startFightPage();
            }
        }
    });

    // Добавим имя отдельно сверху
    const nameElement = document.createElement('div');
    nameElement.classList.add('fighter-name'); // Добавим класс для имени бойца
    nameElement.textContent = fighter.name;
    card.appendChild(nameElement);

    // Добавление статов бойца
    const statsElement = document.createElement('div');
    statsElement.classList.add('fighter-stats'); // Добавим класс для статов бойца
    statsElement.innerHTML = `<p class="stat-text">
        <span>- Здоровье: ${fighter.health} </span>
        <span>- Броня: ${fighter.armor} </span>
        <span>- Урон: ${fighter.damage} </span>
        <span>- Ловкость: ${fighter.agility} </span>
        <span>- Хитрость: ${fighter.cunning} </span>
        <span>- Выносливость: ${fighter.stamina}</span> 
    </p>`;
    card.appendChild(statsElement);

    return card; // Вернем созданный элемент
}

document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.getElementById('cardsContainer');

    // Проверяем, существует ли элемент с id="cardsContainer"
    if (!cardsContainer) {
        console.error('Элемент с id="cardsContainer" не найден.');
        return;
    }

    // Генерация и добавление карточек бойцов
    for (let i = 0; i < 6; i++) {
        const fighter = Knight.generateRandomFighter(); // Оставляем эту строку, предполагая, что класс Knight уже определен в knight.js
        const card = createFighterCard(fighter);
        cardsContainer.appendChild(card); // Используем appendChild для добавления DOM-элемента в контейнер
    }
});

const cardsContainer = document.getElementById('cardsContainer');

// Проверяем, существует ли элемент с id="cardsContainer"
if (!cardsContainer) {
    console.error('Элемент с id="cardsContainer" не найден.');
    return;
}

// Генерация и добавление карточек бойцов
for (let i = 0; i < 6; i++) {
    const fighter = Knight.generateRandomFighter(); // Оставляем эту строку, предполагая, что класс Knight уже определен в knight.js
    const card = createFighterCard(fighter);

    // Проверяем, что card не является null
    if (card) {
        cardsContainer.appendChild(card);
    }
}

let selectedFighters = [];

function startFightPage() {
    const selectedFighterNames = selectedFighters.map(fighter => encodeURIComponent(fighter.name));
    const url = `index3.html?fighters=${selectedFighterNames.join(',')}`;
    window.location.href = url;
}

