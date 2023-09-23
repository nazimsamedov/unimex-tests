document.querySelector('.partner__btn').addEventListener('click', () => {
  document.querySelector('.modal').classList.toggle('modal--active');
});

document.querySelector('.modal__btn-cancel').addEventListener('click', () => {
  document.querySelector('.modal').classList.remove('modal--active');
});



