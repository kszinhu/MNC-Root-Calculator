//  Eval com asteroídes
evaluate = (input, variables) => {
  with (variables) with (Math) return eval(input);
};

// parametros (f(x), a, b, delta)
BuscaUniforme = (input, a, b, delta, cont = 0) => {
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
  console.log(`Valor da Raiz é: ${xi}`);
};

/** Método das Cordas
 * Quando se tem certeza que existe uma raiz no intervalo de busca e existe apenas uma,
 *  caso contrário método poderá falhar
 */

Cordas = (input, a, b, epsilon) => {
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
  console.log(`Valor da Raiz é: ${xi}`);
};

//  Método de Newton

Newton = (input, a, epsilon, maxIt) => {
  k = 0;
  p = a;
  do {
    k = k + 1;
    q = p;
    if(calculateFirstDerivative(p, x, epsilon) != 0) {
    p = p - (evaluate(input, { x: p }) / calculateFirstDerivative(p, x, epsilon));
    } else if(calculateFirstDerivative(p, x, epsilon) == 0) {  // se f'(x) = 0, reinicie com outro p ou recalcule f' comp+epsilon
      p = p - (evaluate(input, { x: p }) / calculateFirstDerivative(p+epsilon, x, epsilon)); 
    }
  } while((Math.abs(p-q) >= epsilon) && (k != maxIt));
};

//  Método de Newton Modificado

modifiedNewton = (input, a, epsilon, maxIt) => {
  k = 0;
  p = a;
  do {
    if((k % 5) == 0) { // mod 5
      if(calculateFirstDerivative(p, x, epsilon) == 0) {  // se f'(x) = 0, reinicie com outro p ou recalcule f' com p+epsilon
        p = p - (evaluate(input, { x: p }) / calculateFirstDerivative(p+epsilon, x, epsilon));
      }else{
        d = calculateFirstDerivative(p, x, epsilon);
      } 
    } else {
      k = k+1;
      q = p;
      p = p - ((evaluate(input, { x: p }) / d));
    }
  } while((Math.abs(p-q) >= epsilon) && (k != maxIt));
};