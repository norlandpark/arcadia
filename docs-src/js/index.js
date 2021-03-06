import '../scss/index.scss';
import Arcadia from '../../src/js/index'

const arcadia = new Arcadia(window, {
  validate: {
    rules: {
      user_2fa: {
        code: {
          presence: {message: 'Please enter the verification code'},
          format: {
            pattern: '\\d{6}',
            message: 'This verification code is not valid'
          }
        }
      },
      user_sign_in: {
        email: {
          presence: {message: 'Please enter your email address'},
          email: {
            message: 'This email address is not valid'
          }
        }
      },
      user_sign_up: {
        email: {
          presence: {message: 'Please enter your email address'},
          email: {
            message: 'This email address is not valid'
          }
        },
        name: {
          presence: {message: 'Please enter your name'},
        },
        agree_terms: {
          presence: {message: 'To create an account, you must agree to terms of service and privacy policy'},
          inclusion: {
            within: [true],
            message: 'To create an account, you must agree to terms of service and privacy policy'
          }
        }
      }
    }
  }
});
arcadia.init();

document.addEventListener('DOMContentLoaded', function () {
  arcadia.ready();

  document.getElementById('toggle-dark-mode').addEventListener('click', (e) => {
    e.stopPropagation();
    arcadia.modules.darkMode.toggle();
    setTimeout(() => e.target.blur(), 120)
  });
});
