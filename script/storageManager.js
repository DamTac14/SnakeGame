export class StorageManager {
    async loadScores() {
        const scores = localStorage.getItem('snakeScores');
        return scores ? JSON.parse(scores) : await this.initScores();
    }

    saveScores(scores) {
        localStorage.setItem('snakeScores', JSON.stringify(scores));
    }

    async initScores() {
        const users = await this.fetchRandomUsers(20);
        const initialScores = users.map(user => ({
            name: `${user.name.first} ${user.name.last}`,
            score: Math.floor(Math.random() * 101)
        }));
        this.saveScores(initialScores);
        return initialScores;
    }

    async fetchRandomUsers(count) {
        try {
            const response = await fetch(`https://randomuser.me/api/?results=${count}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        }
    }
}
