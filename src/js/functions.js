/**
 * returns the mathematical expression formatted using Regex.
 *
 * @param {input} string of the unformatted mathematical expression.
 * @return {output} string of the formatted mathematical expression.
 */
function formattingExpression(input) {
  return input
    .replace(/sen|sin/gi, "sin")
    .replace(/cos/gi, "cos")
    .replace(/tg|tan/gi, "tan")
    .replace(/\^/gi, "**")
    .replace(/pi/gi, "Math.PI")
    .replace(/\log\D/gi, "log10(")
    .replace(/\ln/gi, "log")
    .replace(/\e/gi, "Math.E");
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
const evaluate = (input, variables) => {
  with (variables) with (Math) return eval(input);
};

const genGraph = (element, input, { a, b }) => {
  if (!element || !input || !a || !b) return false;
  element.hidden = false;
  var data = {
    labels: Array.from({ length: Math.abs(a - b) }, (v, k) => k + a),
    datasets: [
      {
        label: input,
        function: (x) => evaluate(formattingExpression(input), { x: x }),
        borderColor: "rgba(75, 192, 192, 1)",
        data: [],
        fill: false,
      },
    ],
  };

  Chart.pluginService.register({
    beforeInit: function (chart) {
      var data = chart.config.data;
      for (var i = 0; i < data.datasets.length; i++) {
        for (var j = 0; j < data.labels.length; j++) {
          var fct = data.datasets[i].function,
            x = data.labels[j],
            y = fct(x);
          data.datasets[i].data.push(y);
        }
      }
    },
  });

  var ChartLine = new Chart(element, {
    type: "line",
    data: data,
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};
