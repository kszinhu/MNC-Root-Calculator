//  Eval com asteroídes
evaluate = (input, variables) => {
  with (variables) with (Math) return eval(input);
};

// parametros (f(x), a, b, delta)
test = (input, a, b, delta, cont = 0) => {
  for (let x = a; x < b; x += delta) {
    let p = x;
    let q = p + delta;
    if (
      Math.sign(evaluate(input, { x: p })) !=
      Math.sign(evaluate(input, { x: q }))
    ) {
      console.log(`Achou intervalo que há uma raíz ${cont++}`);
    } else if (
      (evaluate(input, { x: p }) && evaluate(input, { x: q }) == 0) ||
      true
    ) {
      console.log("Não há raízes no intervalo");
    }
  }
};
