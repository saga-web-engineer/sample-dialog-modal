const openTriggers = document.querySelectorAll<HTMLButtonElement>('button[data-modal-open]');
const closeTriggers = document.querySelectorAll<HTMLButtonElement>('button[data-modal-close]');
const modalElements = document.querySelectorAll<HTMLDialogElement>('.modal');
const scrollbarWidth = window.innerWidth - document.body.clientWidth;

openTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const modalId = trigger.getAttribute('data-modal-open');
    const modalElement = Array.from(modalElements).find((el) => el.id === modalId);

    if (modalElement) {
      modalElement?.removeAttribute('style');
      modalElement?.showModal();
      document.body.style.setProperty('padding-right', `${scrollbarWidth}px`);
      document.querySelector('.modal__inner')?.scrollTo(0, 0);
    }
  });
});

closeTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const modalId = (trigger.closest('.modal') as HTMLDialogElement).id;
    const modalElement = Array.from(modalElements).find((el) => el.id === modalId);

    if (modalElement) {
      modalElement?.close();
      document.body.style.removeProperty('padding-right');
    }
  });
});

modalElements.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    const targetElement = e.target as HTMLElement;
    if (!targetElement.closest('.modal__inner')) {
      modal?.close();
      document.body.style.removeProperty('padding-right');
    }
  });

  modal.addEventListener('close', (e) => {
    document.body.style.removeProperty('padding-right');
    waitDialogAnimation(e.target as HTMLDialogElement)
      .then(() => {
        modal.style.setProperty('display', 'none');
      })
      .catch((error) => {
        console.error('Error', error); // eslint-disable-line
      });
  });
});

const waitDialogAnimation = (dialog: HTMLDialogElement) =>
  Promise.allSettled(
    Array.from(dialog.getAnimations({ subtree: true })).map((animation) => animation.finished)
  );

export {};
