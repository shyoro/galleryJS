const renderer = require('../js/renderer');


describe(`Unit test on renderer functions`, () => {

  test('Test authors parse',() => {
    expect(renderer._parseAuthorName(undefined)).toBe('Unknown authors');
    expect(renderer._parseAuthorName('Washington Irving')).toBe('Washington Irving');
    expect(renderer._parseAuthorName(`washington.irving@outbrain.com "Washington Irving"`)).toBe('Washington Irving');
    expect(renderer._parseAuthorName(`nobody@flickr.com ("CSCandE")`)).toBe('CSCandE');
  });

  test('Test dates', () => {
    expect(renderer._parseDate(`2018-06-17T18:56:18Z`)).toBe('17.06.2018');
    expect(renderer._parseDate(`2018-06-17`)).toBe('17.06.2018');
    expect(renderer._parseDate(`2018-6-1`)).toBe('01.06.2018');
    expect(renderer._parseDate(undefined)).toBe('Unknown Date');
  });
});
