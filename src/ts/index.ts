const openTrigger = document.querySelector<HTMLButtonElement>('button[data-modal-open]');
const closeTrigger = document.querySelector<HTMLButtonElement>('button[data-modal-close]');
const modalElement = document.querySelector<HTMLDialogElement>('.modal');
const scrollbarWidth = window.innerWidth - document.body.clientWidth;

openTrigger?.addEventListener('click', () => {
  modalElement?.removeAttribute('style');
  modalElement?.showModal();
  document.body.style.setProperty('padding-right', `${scrollbarWidth}px`);
  document.querySelector('.modal__inner')?.scrollTo(0, 0);
});

closeTrigger?.addEventListener('click', () => {
  modalElement?.close();
  document.body.style.removeProperty('padding-right');
});

modalElement?.addEventListener('click', (e) => {
  const targetElement = e.target as HTMLElement;
  if (!targetElement.closest('.modal__inner')) {
    modalElement?.close();
    document.body.style.removeProperty('padding-right');
  }
});

modalElement?.addEventListener('close', (e) => {
  document.body.style.removeProperty('padding-right');
  waitDialogAnimation(e.target as HTMLDialogElement)
    .then(() => {
      modalElement.style.setProperty('display', 'none');
    })
    .catch((error) => {
      console.error('Error', error); // eslint-disable-line
    });
});

const waitDialogAnimation = (dialog: HTMLDialogElement) =>
  Promise.allSettled(
    Array.from(dialog.getAnimations({ subtree: true })).map((animation) => animation.finished),
  );
