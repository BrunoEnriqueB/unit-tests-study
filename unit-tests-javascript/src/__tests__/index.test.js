const { sum, inOneHour } = require('../index');

describe('math functions', () => {
  it('sums 2 numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe('time funcions', () => {
  it('test in one hour function', () => {
    const realDateNow = Date.now.bind(global.Date);

    global.Date.now = () => 0;

    expect(inOneHour()).toBe(1 * 60 * 60 * 1000);
    global.Date.now = realDateNow;
  });
});
