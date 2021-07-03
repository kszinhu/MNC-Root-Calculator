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

//  Eval com asteroídes
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

/** Método da Divisão ao Meio
 * Quando se tem certeza que existe uma raiz no intervalo de busca e existe apenas uma,
 *  caso contrário método poderá falhar
 */

Bisseccao = (input, a, b, epsilon) => {
  input = formattingExpression(input);
  while (Math.abs(b - a) / 2 > epsilon) {
    xi = (a + b) / 2;
    if (evaluate(input, { x: xi }) == 0) {
      console.log(`Raíz é: ${xi}`); // Certeza
      break;
    } else {
      if (evaluate(input, { x: a }) * evaluate(input, { x: xi }) < 0) {
        b = xi;
      } else {
        a = xi;
      }
    }
  }
  return xi;
};

/** Método das Cordas
 * Quando se tem certeza que existe uma raiz no intervalo de busca e existe apenas uma,
 *  caso contrário método poderá falhar
 */

Cordas = (input, a, b, epsilon) => {
  input = formattingExpression(input);
  while (Math.abs(b - a) > epsilon) {
    xi =
      (a * Math.abs(evaluate(input, { x: b })) +
        b * Math.abs(evaluate(input, { x: a }))) /
      (Math.abs(evaluate(input, { x: b })) +
        Math.abs(evaluate(input, { x: a })));
    if (evaluate(input, { x: xi }) == 0) {
      console.log(`Raíz é: ${xi}`); // Certeza
      break;
    } else {
      if (evaluate(input, { x: a }) * evaluate(input, { x: xi }) < 0) {
        b = xi;
      } else {
        a = xi;
      }
    }
  }
  return xi;
};

//  Método de Newton

Newton = (input, a, epsilon, maxIt) => {
  input = formattingExpression(input);
  k = 0;
  p = a;
  do {
    k = k + 1;
    q = p;
    p =
      p -
      evaluate(input, { x: p }) / calculateFirstDerivative(input, p, epsilon);
  } while (Math.abs(p - q) >= epsilon && k != maxIt);
  return p;
};

//  Método de Newton Modificado

modifiedNewton = (input, a, epsilon, maxIt) => {
  input = formattingExpression(input);
  k = 0;
  p = a;
  debugger;
  do {
    if (k % 5 == 0) {
      // mod 5
      if (calculateFirstDerivative(input, p, epsilon) == 0) {
        // se f'(x) = 0, reinicie com outro p ou recalcule f' com p+epsilon

        p =
          p -
          evaluate(input, { x: p }) /
            calculateFirstDerivative(input, p + epsilon, epsilon);
        debugger;
      } else {
        d = calculateFirstDerivative(input, p, epsilon);
        debugger;
      }
    }
    k = k + 1;
    q = p;
    p = p - evaluate(input, { x: p }) / d;
    debugger;
  } while (Math.abs(p - q) >= epsilon && k != maxIt);
  return p;
};

/** Método das Cordas Modificado
 * Quando se tem certeza que existe uma raiz no intervalo de busca e existe apenas uma,
 *  caso contrário método poderá falhar
 */
