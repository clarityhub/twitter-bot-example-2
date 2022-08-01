const { expect } = require('chai');

const { getSuggestions } = require('./src/suggestions');

describe('Suggestions', () => {
  it('is a function', () => {
    expect(getSuggestions).to.be.a('function');
  });
  
  it('returns an array of n', () => {
    const suggestions = getSuggestions(3);
    expect(suggestions).to.be.an('array');

    expect(suggestions.length).to.be.equal(3);
  });

  it('returns an array of non-empty values', () => {
    const suggestions = getSuggestions(3);
    const emptyArray = Array(3);
    expect(suggestions).to.not.deep.equal(emptyArray);
  });
});