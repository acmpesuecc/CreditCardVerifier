// Object Array of valid schemes for a given credit card number
// as well as their regexes.
const scheme_validators = [
  {
    name: 'American Express (AMEX)',
    regex: /^3(4|7)[0-9]{13}/,
  },
  {
    name: 'Mastercard',
    regex: /^5[1-5]{1}[0-9]{14}/,
  },
  {
    name: 'Visa',
    regex: /^4[0-9]{15}/,
  },
  {
    name: 'JCB',
    regex: /^35[2-9]{1}[0-9]{13}/,
  },
];

function assign_scheme(number) {
  // function to determine the scheme of a credit card number
  // var name = null;

  // iterate over validators
  valid_names = scheme_validators.map((validator) => {
    // check if number is valid
    var pattern = validator.regex.test(number);
    // return name of scheme with matches in the array
    if (pattern) {
      return validator.name;
    } else {
      return null;
    }
  });

  // return the name of the valid scheme
  return valid_names.filter((name) => name !== null)[0] || 'Unknown';
}

function luhn_algo(number) {
  const val = number;

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0,
    bEven = false;

  for (var n = val.length - 1; n >= 0; n--) {
    var cDigit = val.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 == 0;
}

function verify_number() {
  
  // function to show "Valid" and "Type" fields only after "Verify" has been clicked
  var disp = document.getElementById('output');
  disp.style.display = 'block';

  // function to run both Luhn's Algorithm check as well as scheme matcher
  const number = document.getElementById('check_value').value;

  // output elements
  var card_valid_value = document.querySelector('#card-valid-value');
  var card_type_value = document.querySelector('#card-type-value');

  // validate and match
  const is_valid_luhns = luhn_algo(number);
  const scheme = assign_scheme(number);

  console.log(is_valid_luhns, scheme);

  // show output values
  card_valid_value.innerHTML = is_valid_luhns ? 'YES' : 'NO';
  card_type_value.innerHTML = scheme;
  
}

console.log('check');
function Aadharcheck() {
  var aadhar = prompt("Enter your Aadhar number here!");
  var aadharint = parseInt(aadhar);
  localStorage.setItem('aadharnum',aadharint);
  var aadharcheck = /^[2-9]{1}[0-9]{11}$/;
  if(aadharcheck.test(localStorage.getItem('aadharnum'))){
    alert("Aadhar Number is Valid!");
  } else {
    alert("Aadhar Number is invalid!");
  }
}