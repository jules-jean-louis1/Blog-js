const openModalButton = document.querySelectorAll('[data-modal-target]');
const closeModalButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

const openModal = (modal) => {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

const closeModal = (modal) => {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}
openModalButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});
closeModalButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});
