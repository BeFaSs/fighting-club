class Random {
    static getInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

class Knight {
    constructor(name, health, armor, damage, agility, cunning, stamina) {
        this.name = name;
        this.health = health;
        this.armor = armor;
        this.damage = damage;
        this.agility = agility;
        this.cunning = cunning;
        this.stamina = stamina;
        this.maxHealth = health;
    }

    showStats() {
        console.log(`
    - Боец: ${this.name}
    - Здоровье: ${this.health.toFixed(2)}/${this.maxHealth.toFixed(2)},
    - Броня: ${this.armor.toFixed(2)},
    - Урон: ${this.damage.toFixed(2)},
    - Ловкость: ${this.agility.toFixed(2)},
    - хитрость: ${this.cunning.toFixed(2)},
    - Выносливость: ${this.stamina.toFixed(2)}
    `);
    }

    showCurrentHealth() {
        console.log(`${this.name} Текущее здоровье: ${this.health.toFixed(2)}`);
    }

    takeDamage(damage) {
        if (damage > 0) {
            let adjustedArmor = this.armor - this.cunning * 0.25;
            adjustedArmor = Math.max(0, adjustedArmor);

            let damageReductionMultiplier = adjustedArmor > 50 ? 0.5 : (1 - adjustedArmor / 100);

            let effectiveDamage = damage * damageReductionMultiplier;
            this.health -= effectiveDamage;

            console.log(`${this.name} получено ${effectiveDamage.toFixed(2)} урона. ${this.name} Здоровье: ${this.health.toFixed(2)}`);
        } else {
            console.log(`${this.name} не получил урона. ${this.name} Здоровье: ${this.health.toFixed(2)}`);
        }
    }

    armorAdjustment() {
        let adjustedArmor = this.armor - this.cunning * 0.25;
        if (adjustedArmor === 0) {
            adjustedArmor = 0;
        }
        return Math.min(adjustedArmor, 200) * 0.015;
    }

    agilityMultiplier() {
        return 1 + this.agility * 0.03;
    }

    startFight(opponent) {
        console.log(`Драка между ${this.name} и ${opponent.name} begins!\n`);

        while (this.health > 0 && opponent.health > 0) {
            let damageApply = opponent.damage * this.agilityMultiplier();
            damageApply = Math.max(2, Math.round(damageApply));
            this.takeDamage(damageApply);

            if (this.health <= 0) {
                console.log(`${opponent.name} победил!\n`);
                break;
            }

            let opponentDamageApply = this.damage * opponent.agilityMultiplier();
            opponentDamageApply = Math.max(2, Math.round(opponentDamageApply));
            opponent.takeDamage(opponentDamageApply);

            if (opponent.health <= 0) {
                console.log(`${this.name} победил!\n`);
                break;
            }
        }
    }

    static usedNames = [];

    static resetUsedNames() {
        this.usedNames = [];
    }

    static generateRandomName() {
    let names = ["Буля", "Витязь", "Картофан", "Укурыш", "Куки",
    "Андрей Муравьёв", "Крипок", "Пудж", "Соломка", "Дро..н",
    "Капустофель", "Оливка", "Мазик", "Шнурок", "Коротыш",
    "Вождь", "Синки", "Винки", "Динки", "Какиш"];

    if (this.usedNames.length === names.length) {
        // Если все имена использованы, сбросим массив использованных имен
        this.usedNames = [];
    }

    const availableNames = names.filter((name) => !this.usedNames.includes(name));

    if (availableNames.length === 0) {
        throw new Error("Использованы все имена");
    }

    const randomName = availableNames[Random.getInRange(0, availableNames.length - 1)];
    this.usedNames.push(randomName);
    
    return randomName;
}

    static generateRandomFighter() {
        let name = this.generateRandomName();
        let health = Random.getInRange(50, 150);
        let armor = Random.getInRange(50, 200);
        let damage = Random.getInRange(10, 50);
        let agility = Random.getInRange(5, 20);
        let cunning = Random.getInRange(1, 8);
        let stamina = Random.getInRange(1, 8);

        return new Knight(name, health, armor, damage, agility, cunning, stamina);
    }
}

export default Knight;
