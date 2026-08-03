const loader = document.querySelector('.page-loader');
window.addEventListener('load', () => {
  setTimeout(() => loader?.classList.add('loaded'), 250);
});

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

function closeMenu() {
  nav?.classList.remove('open');
  menuToggle?.classList.remove('active');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  revealObserver.observe(el);
});

document.querySelectorAll('.plan-select').forEach(button => {
  button.addEventListener('click', () => {
    const planField = document.getElementById('planField');
    if (planField) planField.value = button.dataset.plan;
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  });
});

const leadForm = document.getElementById('leadForm');
leadForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(leadForm);
  const text = [
    'Olá, Tais! Gostaria de solicitar uma avaliação da minha empresa.',
    '',
    `Nome: ${data.get('nome')}`,
    `Empresa: ${data.get('empresa')}`,
    `Cidade: ${data.get('cidade') || 'Não informada'}`,
    `Segmento: ${data.get('segmento') || 'Não informado'}`,
    `Volume de notas: ${data.get('volume')}`,
    `Plano de interesse: ${data.get('plano')}`,
    `Necessidade: ${data.get('mensagem') || 'Prefiro explicar durante a conversa.'}`
  ].join('\n');

  const url = `https://wa.me/5548996451495?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');
});

document.querySelectorAll('details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    document.querySelectorAll('details').forEach(other => {
      if (other !== detail) other.open = false;
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
