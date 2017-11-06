var NUMBERS = [
  { number: 1, color: 'red' },
  { number: 2, color: 'red' },
  { number: 3, color: 'blue' },
  { number: 4, color: 'blue' },
  { number: 5, color: 'green' },
  { number: 6, color: 'green' },
  { number: 7, color: 'red' },
  { number: 8, color: 'red' },
  { number: 9, color: 'blue' },
  { number: 10, color: 'blue' },
  { number: 11, color: 'green' },
  { number: 12, color: 'red' },
  { number: 13, color: 'red' },
  { number: 14, color: 'blue' },
  { number: 15, color: 'blue' },
  { number: 16, color: 'green' },
  { number: 17, color: 'green' },
  { number: 18, color: 'red' },
  { number: 19, color: 'red' },
  { number: 20, color: 'blue' },
  { number: 21, color: 'green' },
  { number: 22, color: 'green' },
  { number: 23, color: 'red' },
  { number: 24, color: 'red' },
  { number: 25, color: 'blue' },
  { number: 26, color: 'blue' },
  { number: 27, color: 'green' },
  { number: 28, color: 'green' },
  { number: 29, color: 'red' },
  { number: 30, color: 'red' },
  { number: 31, color: 'blue' },
  { number: 32, color: 'green' },
  { number: 33, color: 'green' },
  { number: 34, color: 'red' },
  { number: 35, color: 'red' },
  { number: 36, color: 'blue' },
  { number: 37, color: 'blue' },
  { number: 38, color: 'green' },
  { number: 39, color: 'green' },
  { number: 40, color: 'red' },
  { number: 41, color: 'blue' },
  { number: 42, color: 'blue' },
  { number: 43, color: 'green' },
  { number: 44, color: 'green' },
  { number: 45, color: 'red' },
  { number: 46, color: 'red' },
  { number: 47, color: 'blue' },
  { number: 48, color: 'blue' },
  { number: 49, color: 'green' },
];

function draw() {
  // msCrypto for IE 11:
  var crypto = window.crypto || window.msCrypto;

  var draws = [];
  while (draws.length < 7) {
    var draw = new Uint32Array(1);
    crypto.getRandomValues(draw);
    var randomIndex = draw[0] % NUMBERS.length;
    if (draws.indexOf(randomIndex) === -1) {
      draws.push(randomIndex);
    }
  }

  return {
    numbers: draws.slice(0, 6).sort(function (a, b) { return a - b; }),
    extra: draws.slice(6),
  };
}