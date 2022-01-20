// Sources:
// https://www.youtube.com/watch?v=YCoeX4-GHAQ
// https://www.geeksforgeeks.org/program-calculate-value-ncr/

const hypergeometric = (
  populationSize: number,
  successesInPopulation: number,
  sampleSize: number,
  sampleSuccess: number
) => {
  const a = nCr(successesInPopulation, sampleSuccess);
  const b = populationSize - successesInPopulation;
  const c = sampleSize - sampleSuccess;
  const d = nCr(b, c);
  const e = a * d;
  const f = nCr(populationSize, sampleSize);
  return e / f;
};

const cumulativeHypergeometric = (
  populationSize: number,
  successesInPopulation: number,
  sampleSize: number,
  sampleSuccess: number
) => {
  let sum = 0;
  for (let i = 0; i < sampleSuccess; i++) {
    sum += hypergeometric(populationSize, successesInPopulation, sampleSize, i);
  }
  return Math.floor((1 - sum) * 100).toFixed(0);
};

export { cumulativeHypergeometric };

// (S nCr X)  ((N-S) nCr (n-X))  /(N nCr n)
//
// a = (S nCr X)
// b = (N-S)
// c = (n-X)
// d = (N-S) nCr (n-X) || b nCr c
// e = (S nCr X)  ((N-S) nCr (n-X)) || a * d
// f = (N nCr n)

function nCr(n: number, r: number) {
  return fact(n) / (fact(r) * fact(n - r));
}

function fact(n: number) {
  var res = 1;
  for (var i = 2; i <= n; i++) res = res * i;
  return res;
}
