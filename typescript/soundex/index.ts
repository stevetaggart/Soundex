export function encode(input: string): string {
  return (
    input[0] +
    adjustSize(
      deduplicate(
        input[0],
        filterZeros(filterAdjacent(mapLetters(input.substr(1))))
      )
    )
  );
}

export function mapLetters(input: string): string {
  return input
    .toLocaleLowerCase()
    .replace(/[aeiouyhwAEIOUYHW]/g, '0')
    .replace(/[bfpvBFPV]/g, '1')
    .replace(/[cgjkqsxzCGJKQSXZ]/g, '2')
    .replace(/[dtDT]/g, '3')
    .replace(/[lL]/g, '4')
    .replace(/[mnMN]/g, '5')
    .replace(/[rR]/g, '6');
}

export function filterAdjacent(input: string): string {
  return input.split('').reduce((acc, letter) => {
    if (acc[acc.length - 1] === letter) {
      return acc;
    }
    return acc + letter;
  });
}

export function adjustSize(input: string): string {
  return input.padEnd(3, '0').substr(0, 3);
}

export function deduplicate(firstLetter: string, input: string): string {
  return input.startsWith(mapLetters(firstLetter)) ? input.substr(1) : input;
}

export function filterZeros(input: string): string {
  return input.replace(/0/g, '');
}
