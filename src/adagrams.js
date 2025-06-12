export const drawLetters = () => {
  const LETTER_POOL = {
    'A': 9, 
    'B': 2, 
    'C': 2, 
    'D': 4, 
    'E': 12, 
    'F': 2, 
    'G': 3, 
    'H': 2, 
    'I': 9, 
    'J': 1, 
    'K': 1, 
    'L': 4, 
    'M': 2, 
    'N': 6, 
    'O': 8, 
    'P': 2, 
    'Q': 1, 
    'R': 6, 
    'S': 4, 
    'T': 6, 
    'U': 4, 
    'V': 2, 
    'W': 2, 
    'X': 1, 
    'Y': 2, 
    'Z': 1
  }

  let letterPool = [];
  for (const letter in LETTER_POOL) {
    for (let i = 0; i < LETTER_POOL[letter]; i++) {
      letterPool.push(letter);
    }
  }

  let drawnLetters = [];
  for (let i = 0; i < 10; i ++) {
    const newLetter = letterPool[Math.floor(Math.random() * letterPool.length)]
    letterPool.splice(letterPool.indexOf(newLetter), 1);
    drawnLetters.push(newLetter);
  }
  return drawnLetters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const uppercaseWord = input.toUpperCase();
  const letterBank = [...lettersInHand];
  for (const letter of uppercaseWord) {
    if (!letterBank.includes(letter)) {
      return false;
    }
    letterBank.splice(letterBank.indexOf(letter), 1);
  }
  return true;
};

export const scoreWord = (word) => {
  let points = 0;

  if (word.length >= 7) {
    points += 8;
  }

  for (const char of word) {
    const charUpper = char.toUpperCase();
    if (['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'].includes(charUpper)) {
      points += 1;
    } else if (['D', 'G'].includes(charUpper)) {
      points += 2;
    } else if (['B', 'C', 'M', 'P'].includes(charUpper)) {
      points += 3;
    } else if (['F', 'H', 'V', 'W', 'Y'].includes(charUpper)) {
      points += 4;
    } else if (charUpper === 'K') {
      points += 5;
    } else if (['J', 'X'].includes(charUpper)) {
      points += 8;
    } else {
      points += 10;
    }
  }
  return points;
};

export const highestScoreFrom = (words) => {
  let wordScores = {};
  for (const word of words) {
    wordScores[word] = scoreWord(word);
  }

  let winningScore = Object.values(wordScores)[0];
  for (const score of Object.values(wordScores)) {
    if (score > winningScore) {
      winningScore = score;
    }
  }

  let winningWords = [];
  for (const word in wordScores) {
    if (wordScores[word]=== winningScore) {
      winningWords.push(word);
    }
  }

  let winningWord;
  if (winningWords.length > 1) {
    winningWord = winningWords[0]
    for (const word of winningWords) {
      if (word.length >= 10) {
        return { word, score: winningScore };
      } else if (word.length < winningWord.length) {
        winningWord = word;
      } 
    }
  } else {
    return { word: winningWords[0], score: winningScore };
  }
  return { word: winningWord, score: winningScore };
};


