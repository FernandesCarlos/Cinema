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
            const sala = salas[s.salaIndex];
            if (!filme || !sala) return;

            const dataEstreia = new Date(filme.dataEstreia);
            const vendidos = ingressos.filter(ing => ing.sessaoIndex === i).length;
            const capacidade = sala.capacidade || 0;

            if (vendidos < capacidade && dataEstreia <= hoje) {
                selectSessao.innerHTML += `<option value="${i}">${filme.titulo} - ${sala.nome} | ${s.dataHora} | ${capacidade - vendidos} lugares</option>`;
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
        const sala = salas[sessao.salaIndex];
        const dataEstreia = new Date(filme.dataEstreia);
        const hoje = new Date();
        const vendidos = ingressos.filter(ing => ing.sessaoIndex === indexSessao).length;

        if (vendidos >= sala.capacidade) {
            mensagemErro.innerHTML = `<div class="alert alert-danger">Capacidade máxima atingida!</div>`;
            atualizarSelectSessoes();
            return;
        }
        if (dataEstreia > hoje) {
            mensagemErro.innerHTML = `<div class="alert alert-danger">Sessão antes da estreia!</div>`;
            return;
        }

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
            if (!sessao) return;
            const filme = filmes[sessao.filmeIndex];
            const sala = salas[sessao.salaIndex];
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = `${i.nomeCliente} | ${filme?.titulo || ''} | ${sala?.nome || ''} | ${i.assento} | ${i.tipoPagamento}`;
            listaIngressos.appendChild(li);
        });
    }
});
