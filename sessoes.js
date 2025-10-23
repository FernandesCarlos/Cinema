document.addEventListener("DOMContentLoaded", () => {
  const selectFilme = document.getElementById("selectFilme");
  const selectSala = document.getElementById("selectSala");
  const form = document.getElementById("formSessoes");
  const listaSessoes = document.getElementById("listaSessoes");

  let filmes = JSON.parse(localStorage.getItem("filmes") || "[]");
  let salas = JSON.parse(localStorage.getItem("salas") || "[]");
  let sessoes = JSON.parse(localStorage.getItem("sessoes") || "[]");

  // Preencher selects
  filmes.forEach((f,i) => selectFilme.innerHTML += `<option value="${i}">${f.titulo}</option>`);
  salas.forEach((s,i) => selectSala.innerHTML += `<option value="${i}">${s.nome}</option>`);

  atualizarLista();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const sessao = {
      filmeIndex: parseInt(selectFilme.value),
      salaIndex: parseInt(selectSala.value),
      dataHora: document.getElementById("dataHora").value,
      preco: parseFloat(document.getElementById("preco").value),
      idioma: document.getElementById("idioma").value,
      formato: document.getElementById("formato").value
    };
    sessoes.push(sessao);
    localStorage.setItem("sessoes", JSON.stringify(sessoes));
    atualizarLista();
    form.reset();
  });

  function atualizarLista() {
    listaSessoes.innerHTML = "";
    sessoes.forEach((s, i) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${filmes[s.filmeIndex]?.titulo} - ${salas[s.salaIndex]?.nome} | ${s.dataHora} | R$${s.preco.toFixed(2)} | ${s.idioma} | ${s.formato}`;
      listaSessoes.appendChild(li);
    });
  }
});
