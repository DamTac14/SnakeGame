export class Snake {
    constructor(context, width, height) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.reset();
    }

    reset() {
        this.body = [{ x: 10, y: 10 }];
        this.direction = 'RIGHT';
        this.growPending = false;
    }

    move() {
        let head = { ...this.body[0] };
        switch (this.direction) {
            case 'RIGHT':
                head.x = (head.x + 1 + this.width / 10) % (this.width / 10);
                break;
            case 'LEFT':
                head.x = (head.x - 1 + this.width / 10) % (this.width / 10);
                break;
            case 'UP':
                head.y = (head.y - 1 + this.height / 10) % (this.height / 10);
                break;
            case 'DOWN':
                head.y = (head.y + 1 + this.height / 10) % (this.height / 10);
                break;
        }
        this.body.unshift(head);
        if (!this.growPending) this.body.pop();
        this.growPending = false;
    }

    changeDirection(newDirection) {
        const opposites = { 'RIGHT': 'LEFT', 'LEFT': 'RIGHT', 'UP': 'DOWN', 'DOWN': 'UP' };
        if (newDirection.toUpperCase().includes(opposites[this.direction])) return;
        this.direction = newDirection.toUpperCase().replace('ARROW', '');
    }

    grow() {
        this.growPending = true;
    }

    hasEatenFruit(fruitPosition) {
        return this.body[0].x === fruitPosition.x && this.body[0].y === fruitPosition.y;
    }

    hasCollided() {
        const [head, ...body] = this.body;
        return body.some(segment => segment.x === head.x && segment.y === head.y);
    }

    draw() {
        this.context.fillStyle = '#89e1ff';
        this.body.forEach(segment => {
            this.context.fillRect(segment.x * 10, segment.y * 10, 10, 10);
        });
    }
}
