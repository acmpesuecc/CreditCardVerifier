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

  {
    name: 'DISCOVER',
    regex: /^6(?:011\d{12}|5\d{14}|4[4-9]\d{13}|22(?:1(?:2[6-9]|[3-9]\d)|[2-8]\d{2}|9(?:[01]\d|2[0-5]))\d{10})/,
  },
  {
    name: 'UNION',
    regex: /^(62[0-9]{14,17})/,
  },
  {
    name: 'RU',
    regex: /^(((60)([0-9]{14}))|((6521)([0-9]{12}))|((6522)([0-9]{12})))$/,
  },
  {
    name: 'DINER',
    regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
  }
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

function check_enter_key(event) {
    if (event.key == "Enter") {
        verify_number();
    }
}

function luhn_algo(number) {
  const val = number;

  // The verhoff Algorithm. It'hell
  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], 
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], 
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], 
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], 
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], 
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], 
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], 
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], 
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  ]
  
  // permutation table
  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], 
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], 
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], 
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], 
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], 
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], 
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
  ]
  
  let c = 0
  let invertedArray = number.split('').map(Number).reverse()

  invertedArray.forEach((val, i) => {
	  c = d[c][p[(i % 8)][val]]
  })

  return (c === 0)

  
}

function verify_number() {
  // function to run both Luhn's Algorithm check as well as scheme matcher
  const number = document.getElementById('check_value').value;

  // output elements
  var card_valid_value = document.querySelector('#card-valid-value');
  var card_type_value = document.querySelector('#card-type-value');
  var output_div = document.querySelector('#card-output');

  // validate and match
  const is_valid_luhns = luhn_algo(number);
  const scheme = assign_scheme(number);

  console.log(is_valid_luhns, scheme);

  // show output values
  card_valid_value.innerHTML = is_valid_luhns ? 'NO' : 'yes';
  card_type_value.innerHTML = scheme;
  output_div.style.display = "block";
}

console.log('check');