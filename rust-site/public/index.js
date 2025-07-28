import init, { GoGame, ShoppingCart, CartItem } from '../pkg/go_ecommerce.js';

async function run() {
    await init();

    // E-commerce setup
    const cart = new ShoppingCart();
    const products = [
        { id: 1, name: "Go Board (9x9)", price: 29.99 },
        { id: 2, name: "Go Stones Set", price: 15.99 },
        { id: 3, name: "Go Strategy Book", price: 19.99 },
    ];

    const productsDiv = document.getElementById('products');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');

    function updateCart() {
        cartItemsDiv.innerHTML = '';
        const items = cart.get_items();
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerText = `${item.get_name()} - $${item.get_price()} x ${item.get_quantity()}`;
            cartItemsDiv.appendChild(div);
        });
        cartTotalSpan.innerText = cart.get_total().toFixed(2);
    }

    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `${product.name} - $${product.price} <button>Add to Cart</button>`;
        div.querySelector('button').addEventListener('click', () => {
            cart.add_item(product.id, product.name, product.price, 1);
            updateCart();
        });
        productsDiv.appendChild(div);
    });

    // Go game setup
    const game = new GoGame();
    const canvas = document.getElementById('go-board');
    const ctx = canvas.getContext('2d');
    const cellSize = 50;
    const boardSize = 9;

    function drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#dcbb76';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        for (let i = 0; i < boardSize; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellSize + cellSize / 2, cellSize / 2);
            ctx.lineTo(i * cellSize + cellSize / 2, canvas.height - cellSize / 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(cellSize / 2, i * cellSize + cellSize / 2);
            ctx.lineTo(canvas.width - cellSize / 2, i * cellSize + cellSize / 2);
            ctx.stroke();
        }

        // Draw star points
        const starPoints = [[2,2], [2,6], [6,2], [6,6], [4,4]];
        ctx.fillStyle = 'black';
        starPoints.forEach(([row, col]) => {
            ctx.beginPath();
            ctx.arc(col * cellSize + cellSize / 2, row * cellSize + cellSize / 2, 4, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Draw stones
        const board = game.get_board();
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const stone = board[row * boardSize + col];
                if (stone === 1) { // Black
                    ctx.fillStyle = 'black';
                    ctx.beginPath();
                    ctx.arc(col * cellSize + cellSize / 2, row * cellSize + cellSize / 2, cellSize / 2 - 5, 0, 2 * Math.PI);
                    ctx.fill();
                } else if (stone === 2) { // White
                    ctx.fillStyle = 'white';
                    ctx.beginPath();
                    ctx.arc(col * cellSize + cellSize / 2, row * cellSize + cellSize / 2, cellSize / 2 - 5, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.strokeStyle = 'black';
                    ctx.stroke();
                }
            }
        }
    }

    function updateGameStatus() {
        const player = game.get_current_player() === 1 ? 'Black' : 'White';
        document.getElementById('current-player').innerText = player;
        const [blackCaptures, whiteCaptures] = game.get_captures();
        document.getElementById('black-captures').innerText = blackCaptures;
        document.getElementById('white-captures').innerText = whiteCaptures;
        if (game.is_game_over()) {
            document.getElementById('game-status').innerText = `Game Over! Black Captures: ${blackCaptures}, White Captures: ${whiteCaptures}`;
        } else {
            document.getElementById('game-status').innerText = '';
        }
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);
        try {
            if (game.place_stone(row, col)) {
                drawBoard();
                updateGameStatus();
            }
        } catch (e) {
            document.getElementById('game-status').innerText = e;
        }
    });

    document.getElementById('pass-button').addEventListener('click', () => {
        game.pass();
        updateGameStatus();
    });

    drawBoard();
    updateGameStatus();
}

run();