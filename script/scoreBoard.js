export class Scoreboard {
    constructor(storageManager) {
        this.storageManager = storageManager;
        this.scores = [];
        this.loadScores();
    }

    async loadScores() {
        this.scores = await this.storageManager.loadScores();
    }

    isTopScore(score) {
        if (this.scores.length === 0) {
            return true; 
        }
        return this.scores.length < 20 || score > this.scores[this.scores.length - 1].score;
    }

    addScore(playerName, score) {
        this.scores.push({ 
                        name: playerName, 
                        score
                         });
        this.scores.sort((a, b) => b.score - a.score);
        if (this.scores.length > 20) this.scores.pop();
        this.storageManager.saveScores(this.scores);
    }

    display() {
        const scoreboardDiv = document.getElementById('scoreboard');
        scoreboardDiv.innerHTML = this.scores.map((score, index) => 
            `<span>${index + 1}. ${score.name}: ${score.score}</span>`
        ).join('');
    }
    
}
