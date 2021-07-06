const load = () => {
  let options = document.querySelector("#form-methods");
  switch (document.querySelector('input[name="methods"]:checked').value) {
    case "1":
      // Busca Uniforme
      options.innerHTML = `
        <input class="input-item" id="croot-epsilon" type="text" placeholder="&epsilon;"
          onchange="this.value = this.value.replace(/,/g, '.')" />
        <input class="input-item" id="croot-a" type="text" placeholder="a" onchange="this.value = this.value.replace(/,/g, '.')" />
        <input class="input-item" id="croot-b" type="text" placeholder="b" onchange="this.value = this.value.replace(/,/g, '.')" />
      `;
      break;
    case "2":
      // Método das Cordas
      options.innerHTML = `
        <input class="input-item" id="croot-epsilon" type="text" placeholder="&epsilon;"
          onchange="this.value = this.value.replace(/,/g, '.')" />
        <input class="input-item" id="croot-a" type="text" placeholder="a" onchange="this.value = this.value.replace(/,/g, '.')" />
        <input class="input-item" id="croot-b" type="text" placeholder="b" onchange="this.value = this.value.replace(/,/g, '.')" />
      `;
      break;
    case "3":
      // Método de Newton
      options.innerHTML = `
        <input class="input-item" id="croot-epsilon" type="text" placeholder="&epsilon;"
          onchange="this.value = this.value.replace(/,/g, '.')" />        
        <input class="input-item" id="croot-a" type="text" placeholder="a" onchange="this.value = this.value.replace(/,/g, '.')" />
        <input class="input-item" id="croot-maxitr" type="text" placeholder="máximo de iterações" />
      `;
      break;
    case "4":
      // Método da Bissecção
      options.innerHTML = `
        <input class="input-item" id="croot-epsilon" type="text" placeholder="&epsilon;"
          onchange="this.value = this.value.replace(/,/g, '.')" />          
        <input class="input-item" id="croot-a" type="text" placeholder="a" onchange="this.value = this.value.replace(/,/g, '.')" />
        <input class="input-item" id="croot-b" type="text" placeholder="b" onchange="this.value = this.value.replace(/,/g, '.')" />
      `;
      break;
    case "5":
      // Método das Cordas Modificado
      options.innerHTML = `
        <input class="input-item" id="croot-epsilon" type="text" placeholder="&epsilon;"
          onchange="this.value = this.value.replace(/,/g, '.')" />
        <input class="input-item" id="croot-a" type="text" placeholder="a" onchange="this.value = this.value.replace(/,/g, '.')" />
        <input class="input-item" id="croot-b" type="text" placeholder="b" onchange="this.value = this.value.replace(/,/g, '.')" />
      `;
      break;

    case "6":
      // Método de Newton Modificado
      options.innerHTML = `
        <input class="input-item" id="croot-epsilon" type="text" placeholder="&epsilon;"
          onchange="this.value = this.value.replace(/,/g, '.')" />
        <input class="input-item" id="croot-a" type="text" placeholder="a" onchange="this.value = this.value.replace(/,/g, '.')" />
        <input class="input-item" id="croot-maxitr" type="text" placeholder="máximo de iterações" onchange="this.value = this.value.replace(/,/g, '.')" />
      `;
      break;

    default:
      break;
  }
};

function separateRoot() {
  let { a, b } = BuscaUniforme(
    formattingExpression(document.querySelector("#root-function").value),
    Number(document.querySelector("#root-a").value),
    Number(document.querySelector("#root-b").value),
    Number(document.querySelector("#root-delta").value)
  );
  let table = `<table class='table-root'><tr><td>A[i]</td>`;

  for (let cell of a) {
    table += `<td> ${cell} </td>`;
  }
  table += "</tr><tr><td>B[i]</td>";
  for (let cell of b) {
    table += `<td> ${cell} </td>`;
  }
  table += "</tr></table>";
  document.querySelector("#table-submit").innerHTML = table;
}

function methodRoot() {
  const solution = document.querySelector(".method-solution");
  let result = 0;

  switch (document.querySelector('input[name="methods"]:checked').value) {
    case "1":
      // Busca Uniforme
      result = RootBuscaUniforme(
        formattingExpression(document.querySelector("#croot-function").value),
        Number(document.querySelector("#croot-a").value),
        Number(document.querySelector("#croot-b").value),
        Number(document.querySelector("#croot-epsilon").value)
      );
      break;

    case "2":
      // Método das Cordas
      result = Cordas(
        formattingExpression(document.querySelector("#croot-function").value),
        Number(document.querySelector("#croot-a").value),
        Number(document.querySelector("#croot-b").value),
        Number(document.querySelector("#croot-epsilon").value)
      );
      break;

    case "3":
      // Método de Newton
      result = Newton(
        formattingExpression(document.querySelector("#croot-function").value),
        Number(document.querySelector("#croot-a").value),
        Number(document.querySelector("#croot-epsilon").value),
        Number(document.querySelector("#croot-maxitr").value)
      );
      break;

    case "4":
      // Método da Bissecção
      result = Bisseccao(
        formattingExpression(document.querySelector("#croot-function").value),
        Number(document.querySelector("#croot-a").value),
        Number(document.querySelector("#croot-b").value),
        Number(document.querySelector("#croot-epsilon").value)
      );

      break;

    case "5":
      // Método das Cordas Modificado
      result = modifiedRope(
        formattingExpression(document.querySelector("#croot-function").value),
        Number(document.querySelector("#croot-a").value),
        Number(document.querySelector("#croot-b").value),
        Number(document.querySelector("#croot-epsilon").value)
      );
      break;

    case "6":
      // Método de Newton Modificado
      result = modifiedNewton(
        formattingExpression(document.querySelector("#croot-function").value),
        Number(document.querySelector("#croot-a").value),
        Number(document.querySelector("#croot-maxitr").value),
        Number(document.querySelector("#croot-epsilon").value),
      );
      break;

    default:
      break;
  }
  // Aplicando resultado no HTML
  solution.innerHTML = `
  <div style="  display: flex;
  justify-content: space-between;
  align-items: center;">
    <h2 class="title">Raíz</h2>
    <span class="root-value">${result.root}</span>
  </div>
  <div style="  display: flex;
  justify-content: space-between;
  align-items: center;">
    <h2 class="title">Número de Iterações</h2>
    <span id="iterations">${result.cont}</span>
  </div>
  `;
}
