// --- EFEITO DE DIGITAÇÃO (Typewriter) ---
const textElement = document.querySelector('.typewriter');
const phrases = ["Mais Velocidade", "Mais Segurança", "Manutenção", "um Site Novo"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Apagando
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Apaga mais rápido
    } else {
        // Escrevendo
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Escreve normal
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Terminou de escrever a frase, espera um pouco e começa a apagar
        isDeleting = true;
        typeSpeed = 2000; // Pausa antes de apagar
    } else if (isDeleting && charIndex === 0) {
        // Terminou de apagar, muda para a próxima frase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Loop infinito
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Inicia o efeito
document.addEventListener('DOMContentLoaded', type);


// --- CONTADOR DE NÚMEROS (Stats) ---
const stats = document.querySelectorAll('.stat-box h3');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if(current < target) {
                    entry.target.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.innerText = target + "+";
                }
            };
            updateCounter();
            statsObserver.unobserve(entry.target); // Roda só uma vez
        }
    });
});

stats.forEach(stat => statsObserver.observe(stat));