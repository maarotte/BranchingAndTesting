let hamming = require('../index.js').hamming;
let assert = require('chai').assert;

describe('Hamming code testing', function() {
  it('should correctly encode 4 bits to 7-bit hamming code', function() {
    let input = [1, 0, 1, 1];
    let encoded = hamming.encode(input);
    assert.deepEqual(encoded, [0, 1, 1, 0, 0, 1, 1]);
  });

  it('should correctly decode a valid 7-bit hamming code', function() {
    let encoded = [0, 1, 1, 0, 0, 1, 1];
    let decoded = hamming.decode(encoded);
    assert.deepEqual(decoded, [1, 0, 1, 1]);
  });

  it('should detect no error in a valid code (isValid = true)', function() {
    let encoded = [0, 1, 1, 0, 0, 1, 1];
    let valid = hamming.isValid(encoded);
    assert.isTrue(valid);
  });

  it('should fix a 1-bit error and still decode correctly', function() {
    let input = [1, 0, 1, 1];
    let encoded = hamming.encode(input);
    let corrupted = hamming.injectError(encoded, 3); // introduce error at position 3
    let decoded = hamming.decode(corrupted);
    assert.deepEqual(decoded, input);
  });

//виправлення одиничної помилки
it('should detect and correct a single bit error at every position', function() {
  const input = [1, 0, 0, 1];
  const encoded = hamming.encode(input);

  for (let i = 0; i < encoded.length; i++) {
    const corrupted = hamming.injectError([...encoded], i);
    const decoded = hamming.decode(corrupted);
    assert.deepEqual(decoded, input, `Failed to correct error at position ${i}`);
  }
});
//відсутність хибних спрацьовувань 
it('should not falsely detect errors when there are none', function() {
  const input = [0, 1, 1, 0];
  const encoded = hamming.encode(input);
  assert.isTrue(hamming.isValid(encoded));
});
//виявлення двох помилок
it('should detect an error if two bits are flipped (but not correct it)', function() {
  const input = [1, 1, 0, 0];
  let encoded = hamming.encode(input);
  encoded = hamming.injectError(encoded, 1);
  encoded = hamming.injectError(encoded, 4);

  const isStillValid = hamming.isValid(encoded);
  assert.isFalse(isStillValid, 'Code with two errors should be invalid');
});
//кодування і декодування всіх можливих 4-бітних вхідних комбінацій
it('should correctly encode and decode all possible 4-bit combinations', function() {
  for (let i = 0; i < 16; i++) { ї
    let input = [
      (i >> 3) & 1,
      (i >> 2) & 1,
      (i >> 1) & 1,
      i & 1
    ];
    let encoded = hamming.encode(input);
    let decoded = hamming.decode(encoded);
    assert.deepEqual(decoded, input, `Failed on input combination ${input.join('')}`);
  }
});
//поведінка при неправильному розмірі вхідних даних 
it('should throw an error when encoding input of invalid length', function() {
  assert.throws(() => {
    hamming.encode([1, 0, 1]); 
  }, Error, "Input must be 4 bits long");

  assert.throws(() => {
    hamming.encode([1, 0, 1, 1, 0]); 
  }, Error, "Input must be 4 bits long");
});

  
});

