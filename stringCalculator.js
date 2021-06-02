const stn = v => parseInt(v);

const replace = (input, target, goal) => {
  const replacedInput = input.replace(target, goal);
  if (replacedInput.indexOf(target) > -1) {
    return replace(replacedInput, target, goal);
  }
  return replacedInput;
}

const getNumbersArray = ({ source, delimiter }) => {
  if (Array.isArray(delimiter)) {
    const uniqDelimiter = new Date().toString();
    const updatedSource = delimiter.reduce((acc, del) => replace(acc, del, uniqDelimiter), source)
    return updatedSource.split(uniqDelimiter);
  }

  return source.split(delimiter);
};

const getSourceAndDelimiter = input => {
  let delimiter = /\n|,/;
  let source = input;

  if (input.slice(0, 2) === "//") {
    const matched = input.match(/\[([^(\[|\])]+)\]/g);
    delimiter = matched.map(v => v.replace(/(\[|\])/g, ""));
    source = input.split("\n")[1];
  }
  return { source, delimiter };
};

const throwNegativeNumbers = numbers => {
  const negativeNumbers = numbers.filter(v => v < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(`음수는 지원하지 않습니다.(${negativeNumbers.join(",")})`);
  }
  return numbers;
};

const sum = source =>
  source.filter(v => stn(v) < 1000).reduce(
    (acc, val) => (acc += stn(val || 0)),
    0
  );

const add = input => {
  const {source, delimiter} = getSourceAndDelimiter(input);
  const numbers = getNumbersArray({source, delimiter});
  throwNegativeNumbers(numbers);
  return sum(numbers);
};

module.exports = { add };
