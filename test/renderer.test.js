const renderer = require('../js/gallery');


describe(`Unit test on renderer functions`, () => {

  test('Test authors parse',() => {
    expect(renderer._parseAuthorString(undefined)).toBe('Unknown authors');
    expect(renderer._parseAuthorString('Washington Irving')).toBe('Washington Irving');
    expect(renderer._parseAuthorString(`washington.irving@outbrain.com "Washington Irving"`)).toBe('Washington Irving');
    expect(renderer._parseAuthorString(`nobody@flickr.com ("CSCandE")`)).toBe('CSCandE');
  });

  test('Test images', () => {
    expect(renderer._image(`http://someurl.com/images/img1234.jpg`,2)).toBeTruthy();
    expect(renderer._image(undefined,2)).toBeFalsy();
    expect(renderer._image(`http://someurl.com/images/img1234.jpg`,undefined)).toBeFalsy();
    expect(renderer._image(undefined,undefined)).toBeFalsy();
  });

  test('Test dates', () => {
    expect(renderer._parseDateString(`2018-06-17T18:56:18Z`)).toBe('17.06.2018');
    expect(renderer._parseDateString(`2018-06-17`)).toBe('17.06.2018');
    expect(renderer._parseDateString(`2018-6-1`)).toBe('01.06.2018');
    expect(renderer._parseDateString(undefined)).toBe('Unknown Date');
    expect(renderer._dateTaken(`2018-06-17T18:56:18Z`)).toBeTruthy();
    expect(renderer._dateTaken(undefined)).toBeFalsy();
  });
});
