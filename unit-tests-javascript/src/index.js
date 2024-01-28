function sum(a, b) {
  return a + b;
}

function inOneHour() {
  return Date.now() + 1 * 60 * 60 * 1000;
}

module.exports = { sum, inOneHour };
