import './style.css';
import './scss/styles.scss';
// import * as bootstrap from 'bootstrap';

const hamBurger = document.querySelector('.toggle-btn');

hamBurger.addEventListener('click', () => {
  document.querySelector('#sidebar').classList.toggle('expand');
});