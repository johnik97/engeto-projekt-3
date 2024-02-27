class WebPage {
  constructor() {
    this.checkbox = document.getElementById('checkbox');
    this.body = document.body;
    this.passwordForm = document.getElementById('registration-form');

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.checkbox.addEventListener('change', () => this.toggleTheme());
    this.passwordForm.addEventListener('input', () =>
      this.checkPasswordMatch()
    );
  }

  toggleTheme() {
    this.body.classList.toggle('dark-mode', this.checkbox.checked);
    this.body.classList.toggle('light-mode', !this.checkbox.checked);
  }

  checkPasswordMatch() {
    const password1 = document.getElementById('form-password1').value;
    const password2 = document.getElementById('form-password2').value;
    const passwordMatch = document.getElementById('password-match');
    if (password1 !== '' && password2 !== '') {
      if (password1 === password2) {
        passwordMatch.textContent = 'Hesla se shodují.';
        passwordMatch.style.color = 'green';
        passwordMatch.style.display = 'flex';
        passwordMatch.style.flexDirection = 'column';
        passwordMatch.style.alignItems = 'center';
      } else {
        passwordMatch.textContent = 'Hesla se neshodují.';
        passwordMatch.style.color = 'red';
        passwordMatch.style.display = 'flex';
        passwordMatch.style.flexDirection = 'column';
        passwordMatch.style.alignItems = 'center';
      }
    } else {
      passwordMatch.textContent = '';
    }
  }
}
class RegistrationForm {
  constructor(formId, submitButtonId) {
    this.form = document.getElementById(formId);
    this.submitButton = document.getElementById(submitButtonId);
    this.init();
  }

  init() {
    this.submitButton.addEventListener('click', (event) =>
      this.validateForm(event)
    );
  }

  validateForm(event) {
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const password1 = document.getElementById('form-password1').value.trim();
    const password2 = document.getElementById('form-password2').value.trim();
    const formValid = document.getElementById('form-validity');

    if (!name || !email || !password1 || !password2) {
      event.preventDefault();
      formValid.textContent = 'Vyplňte prosím všechna pole';
      formValid.style.fontWeight = '500';
      formValid.style.display = 'flex';
      formValid.style.flexDirection = 'column';
      formValid.style.alignItems = 'center';
    } else {
      formValid.textContent = 'Děkujeme Vám za registraci';
      formValid.style.display = 'flex';
      formValid.style.flexDirection = 'column';
      formValid.style.alignItems = 'center';
    }
  }
}

class ImageZoom {
  constructor(selector) {
    this.zoomableImages = document.querySelectorAll(selector);
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.zoomableImages.forEach((image) => {
      image.addEventListener('mouseenter', () => this.zoomIn(image));
      image.addEventListener('mouseleave', () => this.zoomOut(image));
    });
  }

  zoomIn(image) {
    image.style.transform = 'scale(1.1)';
  }

  zoomOut(image) {
    image.style.transform = 'scale(1)';
  }
}

class BackToTopButton {
  constructor(selector) {
    this.button = document.querySelector(selector);
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.toggleVisibility());
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  toggleVisibility() {
    if (window.scrollY > 20) {
      this.button.style.display = 'block';
    } else {
      this.button.style.display = 'none';
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

class MobileMenu {
  constructor(menuIconSelector, menuSelector, hamburgerIconSelector, themeSelector) {
    this.menuIcon = document.querySelector(menuIconSelector);
    this.menuList = document.querySelector(menuSelector);
    this.hamburgerIcon = document.querySelector(hamburgerIconSelector);
    this.themeIcon = document.querySelector(themeSelector);

    this.menuIcon.addEventListener('click', () => this.toggleMenu());
    this.checkScreenWidth();

    window.addEventListener('resize', () => this.checkScreenWidth());
  }

  toggleMenu() {
    if (this.hamburgerIcon.classList[1] === 'fa-bars') {
      this.hamburgerIcon.classList.add('fa-xmark');
      this.hamburgerIcon.classList.remove('fa-bars');
      this.menuList.style.opacity = '0';
      this.menuList.style.display = 'block';
      this.themeIcon.style.display = 'none';
      setTimeout(() => {
        this.menuList.style.transition = 'opacity .25s ease-in-out';
        this.menuList.style.opacity = '1';
      }, 250);
    } else {
      this.hamburgerIcon.classList.add('fa-bars');
      this.hamburgerIcon.classList.remove('fa-xmark');
      this.menuList.style.opacity = '0';
      setTimeout(() => {
        this.menuList.style.transition = 'opacity .25s ease-in-out';
        this.menuList.style.display = 'none';
        this.menuList.style.opacity = '1';
        this.themeIcon.style.display = 'flex';
      }, 250);
    }
  }

  checkScreenWidth() {
    const mobileWidth = window.matchMedia('(max-width: 767px)');
    if (mobileWidth.matches) {
      this.menuList.style.display = 'none';
      this.hamburgerIcon.classList.remove('fa-xmark');
      this.hamburgerIcon.classList.add('fa-bars');
    } else {
      this.menuList.style.display = 'block';
      this.hamburgerIcon.classList.remove('fa-bars');
      this.hamburgerIcon.classList.remove('fa-xmark');
    }
  }
}

const webPage = new WebPage();
const registrationForm = new RegistrationForm(
  'registration-form',
  'form-submit'
);
const imageZoom = new ImageZoom('.zoomable');
const backToTopButton = new BackToTopButton('#back-to-top');
const mobileMenu = new MobileMenu('.menu-icon', 'ul', '.fa-solid', '.theme-container');
