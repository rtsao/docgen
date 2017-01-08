function increment(int : number) {
  return int++;
}

function pow2(int : number) {
  return int * int;
}

const square = pow2;

export {increment, square};
