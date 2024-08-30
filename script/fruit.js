export class Fruit {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.position = this.randomPosition();
    }

    randomPosition() {
        const x = Math.floor(Math.random() * (this.width / 10));
        const y = Math.floor(Math.random() * (this.height / 10));
        return { x, y };
    }

    reposition(snakeBody = []) {
        do {
            this.position = this.randomPosition();
        } while (snakeBody.some(segment => segment.x === this.position.x && segment.y === this.position.y));
    }

    draw(context) {
        context.fillStyle = '#ff2040';
        context.fillRect(this.position.x * 10, this.position.y * 10, 10, 10);
    }
}
