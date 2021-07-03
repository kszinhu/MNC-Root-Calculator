/**
 * returns the mathematical expression formatted using Regex.
 *
 * @param {input} string of the unformatted mathematical expression.
 * @return {output} string of the formatted mathematical expression.
 */
function formattingExpression(input) {
  const output = input
    .replace(/sen|sin/gi, "sin")
    .replace(/cos/gi, "cos")
    .replace(/tg|tan/gi, "tan")
    .replace(/\^/gi, "**")
    .replace(/pi/gi, "Math.PI")
    .replace(/\log\D/gi, "log10(")
    .replace(/\ln/gi, "log")
    .replace(/\e/gi, "Math.E");
  return output;
}

/**
 * returns the value at the point of the derivative.
 *
 * @param {input} string of the formatted mathematical expression.
 * @param {x} number of X.
 * @param {epsilon} number of Epsilon.
 * @return {output} value at the point of the derivative.
 */
function calculateFirstDerivative(input, x, epsilon) {
  let h = 1000 * epsilon;
  p = (evaluate(input, { x: x + h }) - evaluate(input, { x: x - h })) / (2 * h);

  for (let index = 0; index < 10; index++) {
    let q = p;
    h /= 2;

    p =
      (evaluate(input, { x: x + h }) - evaluate(input, { x: x - h })) / (2 * h);
    if (Math.abs(p - q) < epsilon) break;
  }
  return p;
}

/**
 * function that performs the true calculation of the mathematical expression.
 *
 * @param {input} string of the formatted mathematical expression.
 * @param {variables} object with various value and value respectively (key:value).
 * @return {output} value at the point of the derivative.
 */
evaluate = (input, variables) => {
  with (variables) with (Math) return eval(input);
};

// parametros (f(x), a, b, delta)
BuscaUniforme = (input, a, b, delta, cont = 0) => {
  input = formattingExpression(input);
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
