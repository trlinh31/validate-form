function Validator(options) {
  function validate(inputElement, rule) {
    let errorElement = inputElement.parentElement.querySelector('.form-message');
    let errorMessage = rule.test(inputElement.value);
    if(errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add('invalid');
    } else {
      errorElement.innerText = '';
      inputElement.parentElement.classList.remove('invalid');
    }
  }

  const formElement = document.querySelector(options.form);
  if(formElement) {
    options.rules.forEach((rule) => {
      let inputElement = formElement.querySelector(rule.selector);
      if(inputElement) {
        inputElement.onblur = () => {
          validate(inputElement, rule);
        }

        inputElement.oninput = () => {
          let errorElement = inputElement.parentElement.querySelector('.form-message');
          errorElement.innerText = '';
          inputElement.parentElement.classList.remove('invalid');
        }
      }
    })
  }
}

Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : 'Vui lòng nhập trường này!';
    }
  }
}

Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailRegex.test(value) ? undefined : 'Email không hợp lệ';
    }
  }
}

Validator.minLength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
    }
  }
}

Validator.isConfirmed = function (selector, getConfirmValue) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue() ? undefined : 'Mật khẩu nhập lại không đúng';
    }
  }
}