document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  hero.style.opacity = 0;
  hero.style.transition = "opacity 1.2s ease-in-out";
  setTimeout(() => hero.style.opacity = 1, 300);
});


// MENU MOBILE (abrir/fechar sidebar)
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  nav.classList.toggle("active");
});

// Fecha o menu ao clicar em um link
document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    toggle.classList.remove("active");
    nav.classList.remove("active");
  });
});


// Section 2
// Animação ao rolar (fade-in quando a section aparece)
document.addEventListener("DOMContentLoaded", () => {
  const sobreSection = document.querySelector(".sobre");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sobreSection.classList.add("show");
      }
    });
  });

  observer.observe(sobreSection);
});


// Botão para subir
// Seleciona o botão
let scrollTop = document.querySelector('.scroll-top');

// Mostra ou esconde o botão
function toggleScrollTop() {
  if (scrollTop) {
    window.scrollY > 100
      ? scrollTop.classList.add('active')
      : scrollTop.classList.remove('active');
  }
}

// Voltar ao topo ao clicar
scrollTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Eventos
window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);


// Barra de filtro

const filtroItens = document.querySelectorAll('.filtro-menu li');
const projetos = document.querySelectorAll('.projeto');
const indicador = document.querySelector('.filtro-indicador');
const container = document.querySelector('.container'); // pai dos projetos

function moverIndicador(elemento) {
  const { offsetLeft, offsetWidth } = elemento;
  indicador.style.left = `${offsetLeft}px`;
  indicador.style.width = `${offsetWidth}px`;
}

// Inicializa o indicador
window.addEventListener('load', () => {
  const ativo = document.querySelector('.filtro-menu li.ativo');
  moverIndicador(ativo);
});

filtroItens.forEach(item => {
  item.addEventListener('click', () => {
    // Atualiza estado visual
    filtroItens.forEach(i => i.classList.remove('ativo'));
    item.classList.add('ativo');
    moverIndicador(item);

    const filtro = item.getAttribute('data-filtro');

    // 1️⃣ adiciona classe para fade out simultâneo
    container.classList.add('projetos-ocultos');

    // 2️⃣ depois de 400ms (fade out concluído), filtra e mostra só os corretos
    setTimeout(() => {
      projetos.forEach(proj => {
        const tipo = proj.querySelector('.tag').textContent.toLowerCase();

        if (filtro === 'todos') {
          proj.classList.remove('oculto');
        } else if (
          (filtro === 'analise' && tipo.includes('análise')) ||
          (filtro === 'ciencia' && tipo.includes('ciência')) ||
          (filtro === 'engenharia' && tipo.includes('engenharia')) ||
          (filtro === 'automacao' && tipo.includes('automação')) ||
          (filtro === 'web' && tipo.includes('web'))
        ) {
          proj.classList.remove('oculto');
        } else {
          proj.classList.add('oculto');
        }
      });

      // 3️⃣ remove fade out e aplica fade in geral
      container.classList.remove('projetos-ocultos');
    }, 400);
  });
});


// Js sobre Ler mais e Ler menos

const btnToggle = document.getElementById('btn-toggle');
const experienciasOcultas = document.getElementById('experiencias-ocultas');

btnToggle.addEventListener('click', () => {
  experienciasOcultas.classList.toggle('mostrar');
  btnToggle.classList.toggle('active');

  if (experienciasOcultas.classList.contains('mostrar')) {
    btnToggle.querySelector('span').textContent = 'Ler menos';
  } else {
    btnToggle.querySelector('span').textContent = 'Ler mais';
  }
});

 // Armazenar estado de cada carrossel de imagens
    const imageCarousels = {};

    // Inicializar carrosséis de imagens
    function initImageCarousels() {
        const carousels = document.querySelectorAll('.cases-destaque-images-carousel');
        carousels.forEach((carousel, index) => {
            const images = carousel.querySelectorAll('.cases-destaque-images-container img');
            const dotsContainer = document.getElementById(`dots-${index}`);
            
            imageCarousels[index] = {
                currentIndex: 0,
                totalImages: images.length
            };

            // Ativar primeira imagem
            if (images.length > 0) {
                images[0].classList.add('active');
            }

            // Criar dots
            for (let i = 0; i < images.length; i++) {
                const dot = document.createElement('div');
                dot.className = `cases-destaque-image-dot ${i === 0 ? 'active' : ''}`;
                dot.onclick = () => goToImage(index, i);
                dotsContainer.appendChild(dot);
            }
        });
    }

    function nextImage(carouselIndex) {
        const carousel = imageCarousels[carouselIndex];
        carousel.currentIndex = (carousel.currentIndex + 1) % carousel.totalImages;
        updateImageCarousel(carouselIndex);
    }

    function prevImage(carouselIndex) {
        const carousel = imageCarousels[carouselIndex];
        carousel.currentIndex = (carousel.currentIndex - 1 + carousel.totalImages) % carousel.totalImages;
        updateImageCarousel(carouselIndex);
    }

    function goToImage(carouselIndex, imageIndex) {
        imageCarousels[carouselIndex].currentIndex = imageIndex;
        updateImageCarousel(carouselIndex);
    }

    function updateImageCarousel(carouselIndex) {
        const carouselElement = document.querySelector(`[data-carousel="${carouselIndex}"]`);
        const images = carouselElement.querySelectorAll('.cases-destaque-images-container img');
        const dots = carouselElement.querySelectorAll('.cases-destaque-image-dot');
        const currentIndex = imageCarousels[carouselIndex].currentIndex;

        images.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Funcionalidade de Ler Mais / Ler Menos
    function toggleReadMore(postIndex) {
        const textElement = document.getElementById(`text-${postIndex}`);
        const button = textElement.nextElementSibling;
        
        textElement.classList.toggle('expanded');
        button.textContent = textElement.classList.contains('expanded') ? 'Ler menos' : 'Ler mais';
    }

    // Função para gerenciar o carrossel principal e indicadores
    function initCasesCarousel() {
        const carousel = document.getElementById('casesCarousel');
        const indicatorsContainer = document.getElementById('casesIndicators');
        const items = carousel.querySelectorAll('.cases-destaque-item');
        
        if (items.length === 0) return;

        // Criar indicadores
        items.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'cases-destaque-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => scrollToItem(index));
            indicatorsContainer.appendChild(indicator);
        });

        // Atualizar indicadores ao fazer scroll
        carousel.addEventListener('scroll', updateIndicators);
        window.addEventListener('resize', updateIndicators);

        // Atualizar indicadores inicialmente
        updateIndicators();
    }

    function scrollToItem(index) {
        const carousel = document.getElementById('casesCarousel');
        const items = carousel.querySelectorAll('.cases-destaque-item');
        if (items[index]) {
            items[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    function updateIndicators() {
        const carousel = document.getElementById('casesCarousel');
        const indicators = document.querySelectorAll('.cases-destaque-indicator');
        const items = carousel.querySelectorAll('.cases-destaque-item');
        
        if (items.length === 0) return;

        // Encontrar qual item está mais visível
        const carouselRect = carousel.getBoundingClientRect();
        const carouselCenter = carouselRect.left + carouselRect.width / 2;
        
        let closestIndex = 0;
        let closestDistance = Infinity;

        items.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(itemCenter - carouselCenter);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === closestIndex);
        });
    }

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initImageCarousels();
            initCasesCarousel();
        });
    } else {
        initImageCarousels();
        initCasesCarousel();
    }