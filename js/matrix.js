const canvas = document.getElementById('matrix-effect');
const context = canvas.getContext('2d');

const sleep = (ms) => new Promise((resolve) => {
    const start = performance.now();
    const animate = (timestamp) => {
        if (timestamp - start < ms) {
            requestAnimationFrame(animate);
        } else {
            resolve();
        }
    };
    animate(start);
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const alphabet = "SKILLTRADEZ ";

const fontSize = 12;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const duration = 5500;
let startTime;
let animationFrameId;
let alphabetIndex = 0; // To keep track of the position in alphabet

const animate = async () => {
    let currentTime;
    let elapsedTime;

    while (!startTime || elapsedTime < duration) {
        currentTime = performance.now();
        elapsedTime = currentTime - (startTime || currentTime);

        if (elapsedTime >= duration - 3100) {
            canvas.classList.add('fade-out');
        }

        context.fillStyle = 'rgba(15, 15, 15, 0.25)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = 'rgb(230, 230, 230)';
        context.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(alphabetIndex % alphabet.length);

            context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
            alphabetIndex++; // Increment the alphabet index
        }

        if (!startTime) {
            startTime = currentTime;
        }

        if (elapsedTime > duration) {
            await sleep(5500);
            cancelAnimationFrame(animationFrameId);
            canvas.remove();
        }

        await sleep(10); // A small delay to control the frame rate
    }
};

// Start the animation
animate();

