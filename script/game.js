import { Snake } from './snake.js';
import { Fruit } from './fruit.js';


export class Game {
    constructor(canvasId, scoreboard, storageManager) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 200;
        this.canvas.height = 200;
        this.snake = new Snake(this.context, this.canvas.width, this.canvas.height);
        this.fruit = new Fruit(this.canvas.width, this.canvas.height);
        this.scoreboard = scoreboard;
        this.storageManager = storageManager;
        this.score = 0;
        this.intervalId = null;
        this.gameSpeed = 100;
        this.init();
    }

    init() {
        this.canvas.classList.remove('-defeat');
        document.addEventListener('keydown', (direction) => this.snake.changeDirection(direction.key));
    
        const handleInput = (event, direction) => {
            // Empêche le comportement par défaut (comme le zoom sur les écrans tactiles que j'ai eu en retour lors des tests utilisateurs)
            event.preventDefault(); 
            this.snake.changeDirection(direction);
        };
    
        ['up', 'left', 'right', 'down'].forEach(direction => {
            const btn = document.getElementById(`${direction}-btn`);
            btn.addEventListener('touchstart', (e) => handleInput(e, direction.toUpperCase()));
            btn.addEventListener('click', (e) => handleInput(e, direction.toUpperCase()));
        });
    
        this.startGame();
    }
    

    startGame() {
        this.stopGame();
        this.intervalId = setInterval(() => {
            this.update();
            this.draw();
        }, this.gameSpeed);
    }

    stopGame() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    update() {
        this.snake.move();
        if (this.snake.hasEatenFruit(this.fruit.position)) {
            this.snake.grow();
            this.fruit.reposition(this.snake.body);
            this.score += 10;
        }
        if (this.snake.hasCollided()) {
            this.endGame();
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw();
        this.fruit.draw(this.context);
        this.context.fillStyle = '#fff';
        this.context.fillText(`Score: ${this.score}`, 10, 20);
    }

    endGame() {
        clearInterval(this.intervalId);
        this.canvas.classList.add('-defeat');
        
        if (this.scoreboard.isTopScore(this.score)) {
            this.promptForName();
        } 
        this.showRetryButton(); 
        
    }

    showRetryButton() {
        const retryContainer = document.getElementById('retry-container');
        retryContainer.style.display = 'block';
        
        const retryButton = document.getElementById('retry-button');
        retryButton.removeEventListener('click', this.handleRetryClick);
        retryButton.addEventListener('click', this.handleRetryClick.bind(this)); 
    }

    handleRetryClick() {
        this.canvas.classList.remove('-defeat');
        document.getElementById('scoreboard').style.display = 'none';
        this.resetGame();
    }

    resetGame() {
        const retryContainer = document.getElementById('retry-container');
        if (retryContainer) {
            retryContainer.style.display = 'none';
        }
        document.getElementById('form-container').classList.add('hidden');
        this.score = 0;
        this.snake = new Snake(this.context, this.canvas.width, this.canvas.height); 
        this.fruit = new Fruit(this.canvas.width, this.canvas.height); 
        this.gameSpeed = 100;
        this.startGame();
    }

    promptForName() {
        document.getElementById('form-container').classList.remove('hidden');
        const form = document.getElementById('score-form');
        form.onsubmit = (e) => {
            e.preventDefault();
            const playerName = document.getElementById('player-name').value;
            this.scoreboard.addScore(playerName, this.score);
            this.showScoreboard();
            document.getElementById('form-container').classList.add('hidden');  
            document.getElementById('scoreboard').style.display = 'flex';
        };
    }

    showScoreboard() {
        this.scoreboard.display();
    }
}
