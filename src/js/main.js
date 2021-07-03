function separateRoot() {
  let { a, b } = BuscaUniforme(
    formattingExpression(document.querySelector("#root-function").value),
    Number(document.querySelector("#root-a").value),
    Number(document.querySelector("#root-b").value),
    Number(document.querySelector("#root-delta").value)
  );
  let table = `<table class='table-root'><tr>`;

  for (let cell of a) {
    table += `<td> ${cell} </td>`; 
  }
  table += "</tr><tr>";
  for (let cell of b) {
    table += `<td> ${cell} </td>`;
  }
  table += "</tr></table>";
  document.querySelector("#table-submit").innerHTML = table;
}
