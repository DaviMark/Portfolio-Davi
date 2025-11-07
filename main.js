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



// Vercel Analytics

// Chama o Vercel Analytics para começar a monitorar a página
  window.VercelAnalytics = window.VercelAnalytics || function() {
    (window.VercelAnalytics.q = window.VercelAnalytics.q || []).push(arguments);
  };
  
  // Inicia o tracking de visualização
  VercelAnalytics('init', {
    projectId: 'prj_JTkt182WLnKigwr0rxqmpyfydkEC', // Substitua 'seu_project_id' com o ID do seu projeto Vercel
  });

  // Envia um evento de página
  VercelAnalytics('trackPage');