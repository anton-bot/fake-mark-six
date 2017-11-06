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
  var draws = getRandomNumbers(7);

  return {
    numbers: draws.slice(0, 6).sort(function (a, b) { return a - b; }),
    extra: draws.slice(6),
  };
}

function selectByComputer() {
  return getRandomNumbers(6).sort(function (a, b) { return a - b; });
}

/**
 * Returns an array of unique random numbers from 0 to 48.
 * @param {number} howMany - How many numbers to return.
 */
function getRandomNumbers(howMany) {
  // msCrypto for IE 11:
  var crypto = window.crypto || window.msCrypto;

  var draws = [];
  while (draws.length < howMany) {
    var draw = new Uint32Array(1);
    crypto.getRandomValues(draw);
    var randomIndex = draw[0] % NUMBERS.length;
    if (draws.indexOf(randomIndex) === -1) {
      draws.push(randomIndex);
    }
  }

  return draws;
}

/**
 * Returns a pseudo-random non-secure number in a range between two numbers.
 * @param {number[]} range - An array of two numbers, first of which is
 *  the lower bound and the second is the upper bound.
 * @returns {number} A non-secure random number in the specified range.
 */
function getRandomBetween(range) {
  var min = range[0];
  var max = range[1];

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculates winnings from a pick of 6 numbers.
 * Example: calculateWin(draw(), selectByComputer());
 * @param {object} lotteryResult
 * @param {number[]} userPicks
 * @returns {object} An object containing prize class (1-7, 1 = jackpot), and
 *  the amount of prize in `money`.
 */
function calculateWin(lotteryResult, userPicks) {
  var firstPrize = [8000000, 74000000];
  var secondPrize = [80000, 1700000];
  var thirdPrize = [16000, 90000];
  var fourthPrize = 9600;
  var fifthPrize = 640;
  var sixthPrize = 320;
  var seventhPrize = 40;

  var normalMatches = 0;
  var extraMatched = false;
  userPicks.forEach(function (number) {
    if (lotteryResult.numbers.indexOf(number) !== -1) {
      normalMatches++;
    } else if (lotteryResult.extra.indexOf(number) !== -1) {
      extraMatched = true;
    }
  });

  if (normalMatches === 6) {
    return { class: 1, money: getRandomBetween(firstPrize) };
  } else if (normalMatches === 5 && extraMatched) {
    return { class: 2, money: getRandomBetween(secondPrize) };
  } else if (normalMatches === 5) {
    return { class: 3, money: getRandomBetween(thirdPrize) };
  } else if (normalMatches === 4 && extraMatched) {
    return { class: 4, money: fourthPrize };
  } else if (normalMatches === 4) {
    return { class: 5, money: fifthPrize };
  } else if (normalMatches === 3 && extraMatched) {
    return { class: 6, money: sixthPrize };
  } else if (normalMatches === 3) {
    return { class: 7, money: seventhPrize };
  } else {
    return { class: 0, money: 0 };
  }
}