const uuidv4 = require('uuid/v4');

const SUGGESTIONS = [
  {
    label: 'Sure, sounds great',
    metadata: uuidv4(),
  },
  {
    label: 'No',
    metadata: uuidv4(),
  },
  {
    label: 'Yes',
    metadata: uuidv4(),
  },
  {
    label: 'Yeah, I can do that',
    metadata: uuidv4(),
  },
  {
    label: 'Try again',
    metadata: uuidv4(),
  },
  {
    label: 'Future unclear',
    metadata: uuidv4(),
  },
];

function getRandom(max=(SUGGESTIONS.length - 1), min=0) {
  return parseInt(((Math.random() * (max - min)) + min), 10);
}

function getSuggestions(n) {
  const temp = new Array(n).fill(1);

  return temp.map(i => SUGGESTIONS[getRandom()]);
}

module.exports = { getSuggestions };