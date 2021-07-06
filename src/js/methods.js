/** Separa com Busca Uniforme
 * Encontra indício de raízes no intervalo
 */

const BuscaUniforme = (input, a, b, delta, cont = 0) => {
  let arrayA = [];
  let arrayB = [];

  for (let x = a; x < b; x += delta) {
    let p = x;
    let q = p + delta;
    if (
      Math.sign(evaluate(input, { x: p })) !=
      Math.sign(evaluate(input, { x: q }))
    ) {
      arrayA.push(p);
      arrayB.push(q);
    } else if (
      (evaluate(input, { x: p }) && evaluate(input, { x: q }) == 0) ||
      true
    ) {
      console.log("Não há raízes no intervalo");
    }
  }
  return { a: arrayA, b: arrayB };
};

/** Primeira Raíz com Busca Uniforme
 *  Encontra a primeira raíz no intervalo e calcula a raíz
 */

const RootBuscaUniforme = (input, a, b, epsilon, cont = 0) => {
  let delta = (b - a) / 1000;
  var fpp = evaluate(input, { x: a });
  for (var p = a; p < b; p += epsilon) {
    let fp = evaluate(input, { x: p });
    if (Math.sign(fp) != Math.sign(fpp) && Math.abs(fp) <= epsilon) {
      return { root: p - delta, cont: cont };
    }
    fpp = fp;
    cont++;
  }
  return false;
};

/** Método da Divisão ao Meio
 * Quando se tem certeza que existe uma raiz no intervalo de busca e existe apenas uma,
 *  caso contrário método poderá falhar
 */

const Bisseccao = (input, a, b, epsilon, cont = 0) => {
  let xi;
  while (Math.abs(b - a) / 2 > epsilon) {
    xi = (a + b) / 2;
    if (evaluate(input, { x: xi }) == 0) {
      // Certeza que é a raíz
      break;
    } else {
      if (evaluate(input, { x: a }) * evaluate(input, { x: xi }) < 0) {
        b = xi;
      } else {
        a = xi;
      }
    }
    cont++;
  }
  return { root: xi, cont: cont };
};

/** Método das Cordas
 * Quando se tem certeza que existe uma raiz no intervalo de busca e existe apenas uma,
 *  caso contrário método poderá falhar
 */

const Cordas = (input, a, b, epsilon, cont = 0) => {
  let xi;
  while (Math.abs(b - a) > epsilon) {
    xi =
      (a * Math.abs(evaluate(input, { x: b })) +
        b * Math.abs(evaluate(input, { x: a }))) /
      (Math.abs(evaluate(input, { x: b })) +
        Math.abs(evaluate(input, { x: a })));
    if (evaluate(input, { x: xi }) == 0) {
      // Certeza que é a raíz
      break;
    } else {
      if (evaluate(input, { x: a }) * evaluate(input, { x: xi }) < 0) {
        b = xi;
      } else {
        a = xi;
      }
    }
    cont++;
  }
  return { root: xi, cont: cont };
};

/** Método de Newton
 * Quando se tem certeza que existe uma raiz no intervalo de busca e existe apenas uma,
 *  caso contrário método poderá falhar
 */

const Newton = (input, a, epsilon, maxIt) => {
  let k = 0;
  let p = a;
  do {
    k = k + 1;
    q = p;
    p =
      p -
      evaluate(input, { x: p }) / calculateFirstDerivative(input, p, epsilon);
  } while (Math.abs(p - q) >= epsilon && k != maxIt);
  return { root: p, cont: k };
};

/** Método de Newton Modificado
 * Quando se tem certeza que existe uma raiz no intervalo de busca e existe apenas uma,
 *  caso contrário método poderá falhar
 */

const modifiedNewton = (input, a, epsilon, maxIt) => {
  let k = 0;
  let p = a;
  do {
    if (k % 5 == 0) {
      // mod 5
      if (calculateFirstDerivative(input, p, epsilon) == 0) {
        // se f'(x) = 0, reinicie com outro p ou recalcule f' com p+epsilon
        p =
          p -
          evaluate(input, { x: p }) /
            calculateFirstDerivative(input, p + epsilon, epsilon);
      } else {
        d = calculateFirstDerivative(input, p, epsilon);
      }
    }
    k = k + 1;
    q = p;
    p = p - evaluate(input, { x: p }) / d;
  } while (Math.abs(p - q) >= epsilon && k != maxIt);
  return { root: p, cont: k };
};

/** Método das Cordas Modificado
 * Quando se tem certeza que existe uma raiz no intervalo de busca e existe apenas uma,
 *  caso contrário método poderá falhar
 */

const modifiedRope = (input, a, b, epsilon) => {
  let k = 1;
  let modA,
    modB = 0;
  var fa, fb, fp, b;
  do {
    fa = evaluate(input, { x: a });
    fb = evaluate(input, { x: b });
    if (modA > 3) {
      p = ((a * fb) / 2 - b * fa) / (fb / 2 - fa);
    } else if (modB > 3) {
      p = (a * fb - (b * fa) / 2) / (fb - fa / 2);
    } else {
      p = (a * fb - b * fa) / (fb - fa);
    }

    fp = evaluate(input, { x: p });

    if (Math.sign(fa) != Math.sign(fb)) {
      a = p;
      modA = 0;
      modB++;
    } else {
      b = p;
      modB = 0;
      modA++;
    }
    k++;
  } while (Math.abs(b - a) > epsilon && fp > epsilon);
  if (!(p == a - 1)) {
    return { root: p, cont: k };
  }
};
