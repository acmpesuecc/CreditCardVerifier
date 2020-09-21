function luhn_algo() {
  const val = document.getElementById("check_value").value;
  console.log(val);

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0, bEven = false;

  for (var n = val.length - 1; n >= 0; n--) {
    var cDigit = val.charAt(n),
    nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  console.log((nCheck % 10) == 0);
}
