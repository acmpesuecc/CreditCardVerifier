// Object Array of valid schemes for a given credit card number
// as well as their regexes.

const scheme_validators = [
  {
    name: 'American Express (AMEX)',
    regex: /^^3[47][0-9]{13}$/,
  },
  {
    name: 'Mastercard',
    regex: /^5[1-5]{1}[0-9]{14}$/,
  },
  {
    name: 'Visa',
    regex: /^4[0-9]{15}$/,
  },
  {
    name: 'JCB',
    regex: /^35[2-9]{1}[0-9]{13}$/,
  },
  {
    name: 'Diners Club',
    regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  },
  {
    name: 'Discover',
    regex: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  },
  {
    name: 'Union Pay',
    regex: /^(62|88)[0-9]{14,17}$/
  },
  {
    name:'RuPay',
    regex: /^6[0-9]{15}$/
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

function check_industry(number){
  first_digit = Math.trunc(number/(Math.pow(10,15)))
  if(first_digit==0) return "ISO/TC 68 and other industry assignments"
  else if(first_digit==1) return "Airlines"
  else if(first_digit==2) return "Airlines, Financial and Future"
  else if(first_digit==3) return "Travel and entertainment (e.g. American Express, Diners Club)"
  else if(first_digit==4) return "Banking and Finance (e.g. Visa, Mastercard, Discover)"
  else if(first_digit==5) return "Banking and Finance (e.g. Visa, Mastercard, Discover)"
  else if(first_digit==6) return "Merchandising and banking/financial (e.g. Discover)"
  else if(first_digit==7) return "Petroleum and other future industry assignments"
  else if(first_digit==8) return "Healthcare, telecommunications and other future industry assignments"
  else if(first_digit==9) return "National assignment"
}

function check_enter_key(event) {
    if (event.key == "Enter") {
        verify_number();
    }
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
  // function to run both Luhn's Algorithm check as well as scheme matcher
  const number = document.getElementById('check_value').value;

  // output elements
  var card_valid_value = document.querySelector('#card-valid-value');
  var card_type_value = document.querySelector('#card-type-value');
  var card_industry_value = document.querySelector('#card-industry-value');  
  var output_div = document.querySelector('#card-output');

  // validate and match
  const is_valid_luhns = luhn_algo(number);
  const scheme = assign_scheme(number);
  const industry = check_industry(number)

  console.log(is_valid_luhns, scheme);

  // show output values
  card_valid_value.innerHTML = is_valid_luhns ? 'YES' : 'NO';
  card_type_value.innerHTML = scheme;
  card_industry_value.innerHTML = industry;
  output_div.style.display = "block";
}

console.log('check');
