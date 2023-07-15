import MersenneTwister from 'mersenne-twister';

const twister = new MersenneTwister(Math.random() * Number.MAX_SAFE_INTEGER);

function getRandomValues(abv: number[]) {
  let l = abv.length;
  while (l--) {
    abv[l] = Math.floor(randomFloat() * 256);
  }
  return abv;
}

function randomFloat() {
  return twister.random();
}

if (!globalThis.crypto) {
  // @ts-ignore
  globalThis.crypto = {};
  // @ts-ignore
  globalThis.crypto.getRandomValues = getRandomValues;
}
