document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const fightersParam = urlParams.get('fighters');
    const fighterNames = fightersParam.split(',');

    // Проверяем, что есть два выбранных бойца
    if (fighterNames.length !== 2) {
        console.error('Неверное количество выбранных бойцов.');
        return;
    }

    // Используем класс Knight из knight.js
    const fighter1 = Knight.usedNames.find(usedName => usedName === decodeURIComponent(fighterNames[0]));
    const fighter2 = Knight.usedNames.find(usedName => usedName === decodeURIComponent(fighterNames[1]));

    // Проверяем, что оба бойца найдены
    if (!fighter1 || !fighter2) {
        console.error('Не удалось найти одного или обоих бойцов.');
        return;
    }

    const resultElement = document.getElementById('fightResult');
    const winner = simulateFight(fighter1, fighter2);

    // Отображаем результаты боя на странице
    resultElement.textContent = `Победитель: ${winner.name}`;
    
    // Добавляем блоки для отображения здоровья после боя
    const healthElement1 = document.getElementById('healthFighter1');
    const healthElement2 = document.getElementById('healthFighter2');

    healthElement1.textContent = `${fighter1.name} Здоровье после боя: ${fighter1.health.toFixed(2)}`;
    healthElement2.textContent = `${fighter2.name} Здоровье после боя: ${fighter2.health.toFixed(2)}`;
});

function simulateFight(fighter1, fighter2) {
    // Используем класс Knight из knight.js
    const simulatedFighter1 = new Knight(fighter1.name, fighter1.health, fighter1.armor, fighter1.damage, fighter1.agility, fighter1.cunning, fighter1.stamina);
    const simulatedFighter2 = new Knight(fighter2.name, fighter2.health, fighter2.armor, fighter2.damage, fighter2.agility, fighter2.cunning, fighter2.stamina);

    // Добавляем блок для отображения хода боя
    const fightLogElement = document.getElementById('fightLog');

    console.log(`Драка между ${fighter1.name} и ${fighter2.name} begins!\n`);
    fightLogElement.textContent += `Драка между ${fighter1.name} и ${fighter2.name} begins!\n\n`;

    while (simulatedFighter1.health > 0 && simulatedFighter2.health > 0) {
        let damageApply = simulatedFighter2.damage * simulatedFighter1.agilityMultiplier();
        damageApply = Math.max(2, Math.round(damageApply));
        simulatedFighter1.takeDamage(damageApply);

        if (simulatedFighter1.health <= 0) {
            console.log(`${fighter2.name} победил!\n`);
            fightLogElement.textContent += `${fighter2.name} победил!\n\n`;
            break;
        }

        let opponentDamageApply = simulatedFighter1.damage * simulatedFighter2.agilityMultiplier();
        opponentDamageApply = Math.max(2, Math.round(opponentDamageApply));
        simulatedFighter2.takeDamage(opponentDamageApply);

        if (simulatedFighter2.health <= 0) {
            console.log(`${fighter1.name} победил!\n`);
            fightLogElement.textContent += `${fighter1.name} победил!\n\n`;
            break;
        }
    }

    return simulatedFighter1.health > 0 ? simulatedFighter1 : simulatedFighter2;
}
