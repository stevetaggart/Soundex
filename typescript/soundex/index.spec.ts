import {
  adjustSize,
  deduplicate,
  encode,
  filterZeros,
  mapLetters,
  filterAdjacent,
} from './index';
import { expect } from 'chai';

describe('when running soundex', () => {
  [
    { input: 'robert', expected: 'r163' },
    { input: 'rupert', expected: 'r163' },
    { input: 'rubin', expected: 'r150' },
    { input: 'ashcraft', expected: 'a226' },
    { input: 'ashcroft', expected: 'a226' },
    { input: 'tymczak', expected: 't522' },
    { input: 'pfister', expected: 'p236' },
    { input: 'honeyman', expected: 'h555' },
  ].forEach(({ input, expected }) => {
    it(`should encode ${input} to ${expected}`, () => {
      const actual = encode(input);
      expect(actual).to.equal(expected);
    });
    it(`should encode ${input.toUpperCase()} to ${expected.toUpperCase()}`, () => {
      const actual = encode(input.toUpperCase());
      expect(actual).to.equal(expected.toUpperCase());
    });
  });
});

describe('when mapping letters', () => {
  [
    { input: 'a', expected: '0' },
    { input: 'e', expected: '0' },
    { input: 'i', expected: '0' },
    { input: 'o', expected: '0' },
    { input: 'u', expected: '0' },
    { input: 'y', expected: '0' },
    { input: 'h', expected: '0' },
    { input: 'w', expected: '0' },
    { input: 'b', expected: '1' },
    { input: 'f', expected: '1' },
    { input: 'p', expected: '1' },
    { input: 'v', expected: '1' },
    { input: 'c', expected: '2' },
    { input: 'g', expected: '2' },
    { input: 'j', expected: '2' },
    { input: 'k', expected: '2' },
    { input: 'q', expected: '2' },
    { input: 's', expected: '2' },
    { input: 'x', expected: '2' },
    { input: 'z', expected: '2' },
    { input: 'd', expected: '3' },
    { input: 't', expected: '3' },
    { input: 'l', expected: '4' },
    { input: 'm', expected: '5' },
    { input: 'n', expected: '5' },
    { input: 'r', expected: '6' },
    {
      input: 'the quick brown fox jumps over the lazy dog',
      expected: '300 20022 16005 102 20512 0106 300 4020 302',
    },
  ].forEach(({ input, expected }) => {
    it(`should encode ${input} to ${expected}`, () => {
      const actual = mapLetters(input);
      expect(actual).to.equal(expected);
    });
    it(`should encode ${input.toUpperCase()} to ${expected.toUpperCase()}`, () => {
      const actual = mapLetters(input.toUpperCase());
      expect(actual).to.equal(expected.toUpperCase());
    });
  });
});

describe('when filtering adjacent duplicates', () => {
  [
    { input: '1111143', expected: '143' },
    { input: '2358843', expected: '235843' },
    { input: 'abdardd', expected: 'abdard' },
    { input: 'abdardert', expected: 'abdardert' },
    { input: 'aardvarrk', expected: 'ardvark' },
  ].forEach(({ input, expected }) => {
    it(`should encode ${input} to ${expected}`, () => {
      const actual = filterAdjacent(input);
      expect(actual).to.equal(expected);
    });
    it(`should encode ${input.toUpperCase()} to ${expected.toUpperCase()}`, () => {
      const actual = filterAdjacent(input.toUpperCase());
      expect(actual).to.equal(expected.toUpperCase());
    });
  });
});

describe('when adjusting size', () => {
  [
    { input: '2345', expected: '234' },
    { input: '123', expected: '123' },
    { input: '12', expected: '120' },
    { input: '2', expected: '200' },
    { input: '', expected: '000' },
  ].forEach(({ input, expected }) => {
    it(`should encode ${input} to ${expected}`, () => {
      const actual = adjustSize(input);
      expect(actual).to.equal(expected);
    });
  });
});

describe('when de-duplicating first character', () => {
  [
    { firstLetter: 'a', input: '00', expected: '0' },
    { firstLetter: 'b', input: '10', expected: '0' },
    { firstLetter: 'g', input: '20', expected: '0' },
    { firstLetter: 't', input: '30', expected: '0' },
    { firstLetter: 'l', input: '40', expected: '0' },
    { firstLetter: 'm', input: '50', expected: '0' },
    { firstLetter: 'r', input: '60', expected: '0' },
    { firstLetter: 'a', input: '10', expected: '10' },
    { firstLetter: 'b', input: '20', expected: '20' },
    { firstLetter: 'g', input: '30', expected: '30' },
    { firstLetter: 't', input: '40', expected: '40' },
    { firstLetter: 'l', input: '60', expected: '60' },
    { firstLetter: 'm', input: '60', expected: '60' },
    { firstLetter: 'r', input: '10', expected: '10' },
  ].forEach(({ firstLetter, input, expected }) => {
    context(`and first letter is ${firstLetter}`, () => {
      it(`should encode ${input} to ${expected}`, () => {
        const actual = deduplicate(firstLetter, input);
        expect(actual).to.equal(expected);
      });
      it(`should encode ${input.toUpperCase()} to ${expected.toUpperCase()}`, () => {
        const actual = deduplicate(firstLetter, input.toUpperCase());
        expect(actual).to.equal(expected.toUpperCase());
      });
    });
  });
});

describe('when filtering zeros', () => {
  [
    { input: '012345', expected: '12345' },
    { input: '120345', expected: '12345' },
    { input: '12345', expected: '12345' },
    { input: '03402300', expected: '3423' },
    { input: '340506', expected: '3456' },
  ].forEach(({ input, expected }) => {
    it(`should encode ${input} to ${expected}`, () => {
      const actual = filterZeros(input);
      expect(actual).to.equal(expected);
    });
  });
});
