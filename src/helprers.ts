
export const convertCardValue = (cardVal: string) => {
  const valAndSuit = cardVal.split("");
  switch(valAndSuit[0]) {
    case 'A': // Need to figure out what to do when 'A' can be 1
      return 11; // return the result of faunction that checks if A is already in players hand
    case 'K':
      return 10;
    case 'Q':
      return 10;
    case 'J':
      return 10;
    case '10':
      return 10;
    case '9':
      return 9;
    case '8':
      return 8;
    case '7':
      return 7;
    case '6':
      return 6;
    case '5':
      return 5;
    case '4':
      return 4;
    case '3':
      return 3;
    case '2':
      return 2;
  }
} 