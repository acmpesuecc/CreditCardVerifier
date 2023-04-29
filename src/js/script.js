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
function give_img(String)
{
    strr=String;
    console.log(strr);
    switch (strr) {
    case "American Express (AMEX)":
      document.getElementById('card-type-img').src ='https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg';
      break;
    case "JCB":
      document.getElementById('card-type-img').src = 'https://1000logos.net/wp-content/uploads/2020/08/JCB-Logo-2003.jpg';
      break;
    case "Mastercard":
      document.getElementById('card-type-img').src = 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg';
      break;
      case "Visa":
      document.getElementById('card-type-img').src='https://km.visamiddleeast.com/dam/VCOM/blogs/visa-blue-gradient-800x450.jpg';
      break;

    default:
      document.getElementById('card-type-img').src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMCHEyWY9OkvwgXom0t75x-kiIGc5FkWhkqBkpCGq0&s';
    }
    
  

}
function verify_number() {
  // function to run both Luhn's Algorithm check as well as scheme matcher
  const number = document.getElementById('check_value').value;

  // output elements
  var card_valid_value = document.querySelector('#card-valid-value');
  var card_type_value = document.querySelector('#card-type-value');
  var output_div = document.querySelector('#card-output');
  var card_type_img=document.querySelector('#card-type-img')    

  // validate and match
  const is_valid_luhns = luhn_algo(number);
  const scheme = assign_scheme(number);
    const imgop=give_img(scheme);

  console.log(is_valid_luhns, scheme,imgop);

  // show output values
  card_valid_value.innerHTML = is_valid_luhns ? 'YES' : 'NO';
  card_type_value.innerHTML = scheme;
    card_type_img.innerHTML = imgop;
  output_div.style.display = "block";
}

console.log('check');

