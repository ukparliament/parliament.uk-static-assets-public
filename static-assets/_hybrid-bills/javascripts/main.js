// Specific functions for Hybrid Bills user forms

UK_Parliament.hybridBillsForms = function () {

  // Hide js detection message if javascript enabled
  if (document.querySelector('body.has-js')) {
    if (document.querySelector('[data-browser="javascript"]')) {

      var jsMessage = document.querySelectorAll('[data-browser="javascript"]');

      jsMessage.forEach(function (message, index) {
        message.style.display = 'none';
      });
    }
  }

  // Hide and show cookies detection message and disable button if present
  if (navigator.cookieEnabled === true) {
    if (document.querySelector('[data-browser="cookies"]')) {

      var ckeMessage = document.querySelectorAll('[data-browser="cookies"]');

      ckeMessage.forEach(function (message, index) {
        message.style.display = 'none';
      });
    }
  } else {
    if (document.querySelector('[data-browser="button"]')) {

      var ckeButtons = document.querySelectorAll('[data-browser="button"]');

      ckeButtons.forEach(function (button, index) {
        button.style.display = 'none';
      });
    }
  }

  // Show and hide form content for representative
  if (document.getElementById('repForm')) {

    // Local variables
    var
      repForm = document.getElementById('repForm'),
      repCheck = document.getElementsByClassName('js-rep-check'),
      indCheck = document.getElementsByClassName('js-ind-check');

    repForm.style.display = 'none';

    repCheck[0].addEventListener('click', function () {
      repForm.style.display = 'block';
    });

    indCheck[0].addEventListener('click', function () {
      repForm.style.display = 'none';
    });
  }

  // Show and hide country selection for individual
  if (document.getElementById('countrySelect')) {

    // Local variables
    var
      indCntSl = document.getElementById('countrySelect'),
      indCntUk = document.getElementsByClassName('js-country-uk'),
      indCntRw = document.getElementsByClassName('js-country-row');

    indCntSl.style.display = 'none';

    indCntRw[0].addEventListener('click', function () {
      indCntSl.style.display = 'block';
    });

    indCntUk[0].addEventListener('click', function () {
      indCntSl.style.display = 'none';
    });
  }

  // Show and hide country selection for representative
  if (document.getElementById('countrySelectRep')) {

    // Local variables
    var
      repCntSl = document.getElementById('countrySelectRep'),
      repCntUk = document.getElementsByClassName('js-country-uk-rep'),
      repCntRw = document.getElementsByClassName('js-country-row-rep');

    repCntSl.style.display = 'none';

    repCntRw[0].addEventListener('click', function () {
      repCntSl.style.display = 'block';
    });

    repCntUk[0].addEventListener('click', function () {
      repCntSl.style.display = 'none';
    });
  }

  // Show and hide petition completion message when radio checked
  if (document.getElementById('petitionCheckStatus')) {

    // Local variables
    var
      radioYes = document.getElementById('petition-check_yes'),
      radioNo = document.getElementById('petition-check_no'),
      message = document.getElementById('petitionCheckStatus');

    message.style.display = 'block';

    radioYes[0].addEventListener('click', function () {
      message.style.display = 'none';
    });

    radioNo[0].addEventListener('click', function () {
      message.style.display = 'block';
    });

  }

  // Enable or disable form submit buttons using form elements
  if (document.querySelector('[data-submit="disabled"]')) {

    var forms = document.querySelectorAll('form');

    // Enabled button attribute and styling
    var styleEnable = function (userButton, userButtonClass) {
      userButton.disabled = false;
      userButton.className = userButtonClass;
    };

    // Disabled button attribute and styling
    var styleDisable = function (userButton) {
      userButton.disabled = true;
      userButton.className = 'btn--disabled';
    };

    forms.forEach(function (elements, index) {

      if (elements.querySelector('[data-submit="disabled"]')) {

        // Grab form submit button and button classes
        var userButton = elements.querySelector('input[type="submit"]');
        var userButtonClass = userButton.className;

        // Disable form submit button
        styleDisable(userButton);

        // Grab all elements that has required data attributes
        var inputChecks = elements.querySelectorAll('[data-submit="disabled"]');

        inputChecks.forEach(function (element, index) {

          // Handle checkbox element
          if (element.type == 'checkbox') {
            element.addEventListener('click', function () {
              if (this.checked) {
                styleEnable(userButton, userButtonClass);
              } else {
                styleDisable(userButton);
              }
            });
          }

          // Handle radio button group
          if (element.type == 'radio') {

            // Grab name of radio group and then collection of same name
            var inputCheckName = element.name;
            var inputCheckNamesArray = document.getElementsByName(inputCheckName);

            // Loop radio group and grab clicked radio button
            inputCheckNamesArray.forEach(function (radios, index) {
              radios.addEventListener('click', function () {
                if (this.dataset.submit == 'disabled' && this.checked) {
                  styleDisable(userButton);
                } else {
                  styleEnable(userButton, userButtonClass);
                }
              });
            });
          }
        });
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', function (event) {
  UK_Parliament.hybridBillsForms();
});
