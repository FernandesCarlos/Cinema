document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formSessoes");
    const selectFilme = document.getElementById("selectFilme");
    const selectSala = document.getElementById("selectSala");
    let filmes = JSON.parse(localStorage.getItem("filmes") || "[]");
    let salas = JSON.parse(localStorage.getItem("salas") || "[]");
    let sessoes = JSON.parse(localStorage.getItem("sessoes") || "[]");

    // Preencher selects
    filmes.forEach((f, i) => {
        selectFilme.innerHTML += `<option value="${i}">${f.titulo}</option>`;
    });
    salas.forEach((s, i) => {
        selectSala.innerHTML += `<option value="${i}">${s.nome}</option>`;
    });

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
        form.reset();
        alert("Sessão cadastrada com sucesso!");
    });
});
