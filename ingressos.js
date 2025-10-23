document.addEventListener("DOMContentLoaded", () => {
  const selectSessao = document.getElementById("selectSessao");
  const form = document.getElementById("formIngressos");
  const listaIngressos = document.getElementById("listaIngressos");
  const mensagemErro = document.getElementById("mensagemErro");

  let sessoes = JSON.parse(localStorage.getItem("sessoes") || "[]");
  let filmes = JSON.parse(localStorage.getItem("filmes") || "[]");
  let salas = JSON.parse(localStorage.getItem("salas") || "[]");
  let ingressos = JSON.parse(localStorage.getItem("ingressos") || "[]");

  function atualizarSelectSessoes() {
    selectSessao.innerHTML = `<option value="">Selecione a Sessão</option>`;
    const hoje = new Date();

    sessoes.forEach((s, i) => {
      const filme = filmes[s.filmeIndex];
      const dataEstreia = new Date(filme.dataEstreia);
      const vendidos = ingressos.filter(ing => ing.sessaoIndex === i).length;
      const capacidade = salas[s.salaIndex]?.capacidade || 0;

      // Bloqueia sessões cheias ou antes da estreia
      if (vendidos < capacidade && dataEstreia <= hoje) {
        selectSessao.innerHTML += `<option value="${i}">${filme.titulo} - ${salas[s.salaIndex]?.nome} | ${s.dataHora} | ${capacidade - vendidos} lugares disponíveis</option>`;
      }
    });
  }

  atualizarSelectSessoes();
  atualizarLista();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    mensagemErro.innerHTML = "";

    const indexSessao = parseInt(selectSessao.value);
    if (isNaN(indexSessao)) return;

    const sessao = sessoes[indexSessao];
    const filme = filmes[sessao.filmeIndex];
    const dataEstreia = new Date(filme.dataEstreia);
    const hoje = new Date();
    const capacidade = salas[sessao.salaIndex]?.capacidade || 0;
    const vendidos = ingressos.filter(ing => ing.sessaoIndex === indexSessao).length;

    // Validação: capacidade máxima
    if (vendidos >= capacidade) {
      mensagemErro.innerHTML = `
        <div class="alert alert-danger d-flex align-items-center" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle-fill me-2" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.646 4.646a.5.5 0 1 0-.708.708L7.293 8l-3.355 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.646 4.646z"/>
          </svg>
          Esta sessão atingiu a capacidade máxima da sala!
        </div>
      `;
      atualizarSelectSessoes();
      return;
    }

    // Validação: estreia não ocorreu
    if (dataEstreia > hoje) {
      mensagemErro.innerHTML = `
        <div class="alert alert-danger d-flex align-items-center" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle-fill me-2" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.646 4.646a.5.5 0 1 0-.708.708L7.293 8l-3.355 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.646 4.646z"/>
          </svg>
          Esta sessão não pode ser vendida antes da estreia do filme!
        </div>
      `;
      return;
    }

    // Venda permitida
    const ingresso = {
      sessaoIndex: indexSessao,
      nomeCliente: document.getElementById("nomeCliente").value,
      cpf: document.getElementById("cpf").value,
      assento: document.getElementById("assento").value,
      tipoPagamento: document.getElementById("tipoPagamento").value
    };

    ingressos.push(ingresso);
    localStorage.setItem("ingressos", JSON.stringify(ingressos));
    atualizarLista();
    form.reset();
    atualizarSelectSessoes();
  });

  function atualizarLista() {
    listaIngressos.innerHTML = "";
    ingressos.forEach(i => {
      const sessao = sessoes[i.sessaoIndex];
      const filme = filmes[sessao.filmeIndex];
      const sala = salas[sessao.salaIndex];
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${i.nomeCliente} | ${filme.titulo} | ${sala.nome} | ${i.assento} | ${i.tipoPagamento}`;
      listaIngressos.appendChild(li);
    });
  }
});
