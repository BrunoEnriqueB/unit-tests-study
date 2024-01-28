import { afterAll, describe, expect, it } from 'vitest';
import getFutureDateInDays from '@/__tests__/utils/getFutureDateInDays';

describe('increases data in one day', () => {
  const date = new Date();

  date.setDate(date.getDay() + 1);

  it(`should get next day`, () => {
    expect(getFutureDateInDays(1).getDay()).toBe(date.getDay());
  });
});
