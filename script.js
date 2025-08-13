  // menu bg
        const btn = document.getElementById('menu-btn');
        const menu = document.getElementById('menu');

        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });


        // Função para alternar a visibilidade das respostas da FAQ
        function toggleFaq(item) {
            item.classList.toggle('active');
        }

        // Exemplo de script para o mapa, caso o iframe precise de alguma interação
        const mapIframe = document.querySelector('iframe');
        if (mapIframe) {
            mapIframe.addEventListener('load', () => {
                console.log('Mapa carregado.');
            });
        }


         function animateCount(el, targetText, duration = 2000) {
    let numberOnly = targetText.replace(/[^0-9]/g, '');
    let number = parseInt(numberOnly, 10);
    if (isNaN(number)) return;

    let prefix = targetText.match(/^[^0-9]+/)?.[0] || '';
    let suffix = targetText.match(/[^0-9]+$/)?.[0] || '';

    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      let progress = Math.min((timestamp - startTime) / duration, 1);
      let current = Math.floor(progress * number);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = targetText;
      }
    }
    requestAnimationFrame(step);
  }

  // Usa Intersection Observer para disparar a contagem quando a seção estiver visível
  window.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#resultados');
    const counters = section.querySelectorAll('h3[data-target]');

    let counted = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counters.forEach(counter => {
            animateCount(counter, counter.getAttribute('data-target'));
          });
          counted = true; // só conta 1 vez
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.3 // quando 30% da seção estiver visível
    });

    observer.observe(section);
  });


window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    const main = document.getElementById('main-content');

    const minSplashTime = 500; // 0.5 segundos
    const startTime = performance.now();

    function hideSplash() {
      splash.classList.add('hide');
      main.classList.add('visible');
      setTimeout(() => {
        splash.style.display = 'none';
      }, 600);
    }

    const elapsed = performance.now() - startTime;
    if (elapsed >= minSplashTime) {
      hideSplash();
    } else {
      setTimeout(hideSplash, minSplashTime - elapsed);
    }
  });


document.addEventListener("DOMContentLoaded", function() {
    // Ensure GSAP and ScrollTrigger are loaded
    gsap.registerPlugin(ScrollTrigger);

    // Hide splash screen after 1 second and trigger hero animations
    setTimeout(() => {
        const splash = document.getElementById("splash");
        if (splash) {
            gsap.to(splash, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    splash.style.display = "none";
                    animateHeroSection();
                }
            });
        } else {
            animateHeroSection();
        }
    }, 1000);

    function animateHeroSection() {
        // Select text container
        const textContainer = document.querySelector("#hero .md\\:w-\\[700px\\]");

        // Animate text container sliding in from left with fade
        gsap.fromTo(
            textContainer,
            { x: -150, opacity: 0 }, // Start position: offset left
            { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
        );

        // Animate avatar image sliding in from right with fade
        gsap.fromTo(
            ".avatar-content img",
            { x: 150, opacity: 0 }, // Start position: offset right
            { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
        );

        // Animate background overlay fading in
        gsap.fromTo(
            "#hero .bg-black",
            { opacity: 0 },
            { opacity: 0.5, duration: 1.5, ease: "power2.out" }
        );
    }
});