import { Game } from './game.js';
import { StorageManager } from './storageManager.js';
import { Scoreboard } from './scoreBoard.js';

function toggleRules() {
    const rulesContainer = document.getElementById('rules-container');
    const button = document.getElementById('toggle-rules-btn');

    if (rulesContainer.classList.contains('hidden')) {
        rulesContainer.classList.remove('hidden');
        button.textContent = 'Cacher les règles';
    } else {
        rulesContainer.classList.add('hidden');
        button.textContent = 'Afficher les règles';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const storageManager = new StorageManager();
    const scoreboard = new Scoreboard(storageManager);
    const game = new Game('gameCanvas', scoreboard, storageManager);

    document.getElementById('toggle-rules-btn').addEventListener('click', toggleRules);
});
