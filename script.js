const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const modal = document.querySelector('#service-modal');
const modalTitle = modal?.querySelector('h2');
const modalText = modal?.querySelector('p');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const serviceDetails = {
  therapy: {
    title: 'Лечение зубов',
    text: 'В карточке клиники указаны лечение кариеса, пульпита и периодонтита, пломбирование и реставрация зубов. Конкретный метод и стоимость определяются после осмотра.'
  },
  implantation: {
    title: 'Имплантация',
    text: 'Имплантология входит в перечень направлений клиники. Для обсуждения показаний, этапов и стоимости свяжитесь с клиникой.'
  },
  prosthetics: {
    title: 'Коронки и протезирование',
    text: 'В перечне услуг указаны ортопедия, коронки и протезирование. Подходящий вариант подбирается после диагностики.'
  },
  endodontics: {
    title: 'Лечение каналов',
    text: 'Клиника указывает эндодонтию и лечение корневых каналов среди направлений работы. Детали лечения можно уточнить при записи.'
  },
  hygiene: {
    title: 'Гигиена и отбеливание',
    text: 'В перечне клиники указаны гигиена полости рта и отбеливание зубов. Уточните доступные процедуры и подготовку у администратора.'
  },
  surgery: {
    title: 'Удаление и хирургия',
    text: 'В открытой карточке указаны удаление зубов и хирургическая стоматология. Объём вмешательства определяется врачом после осмотра.'
  },
  aesthetic: {
    title: 'Эстетическая стоматология',
    text: 'В перечне услуг есть эстетическая стоматология и реставрация зубов. Варианты восстановления обсуждаются индивидуально.'
  },
  gums: {
    title: 'Лечение дёсен',
    text: 'В карточке клиники указано лечение заболеваний дёсен. Для выбора тактики лечения требуется консультация специалиста.'
  },
  diagnostics: {
    title: 'Рентгенография',
    text: 'Рентгенография зубов указана в открытом перечне услуг клиники. Необходимость исследования и его формат определяет специалист.'
  },
  orthodontics: {
    title: 'Ортодонтия',
    text: 'Ортодонтия указана среди направлений клиники. Конкретные варианты коррекции и сроки можно обсудить после консультации.'
  }
};

document.querySelectorAll('[data-service]').forEach(button => {
  button.addEventListener('click', () => {
    const item = serviceDetails[button.dataset.service];
    if (!item || !modal || !modalTitle || !modalText) return;
    modalTitle.textContent = item.title;
    modalText.textContent = item.text;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal?.classList.remove('is-open');
  modal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
modal?.querySelector('.modal-close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

/* Service category filters */
const filters = document.querySelectorAll('.filter-button');
const cards = document.querySelectorAll('.service-card');
filters.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.filter;
    filters.forEach(item => item.classList.toggle('is-active', item === button));
    cards.forEach(card => {
      const show = value === 'all' || card.dataset.category === value;
      card.classList.toggle('is-hidden', !show);
    });
  });
});

/* Accessible FAQ accordion */
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = item.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
  });
});

/* Subtle reveal motion */
const revealTargets = document.querySelectorAll(
  '.trust-item,.section-heading,.service-card,.about-visual,.about-copy,.review-card,.faq-intro,.faq-item,.contact-copy,.contact-card'
);
revealTargets.forEach(element => element.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(element => observer.observe(element));
} else {
  revealTargets.forEach(element => element.classList.add('is-visible'));
}
