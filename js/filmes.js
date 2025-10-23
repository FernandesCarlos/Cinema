document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formFilmes");
    const listaFilmes = document.getElementById("listaFilmes");
    let filmes = JSON.parse(localStorage.getItem("filmes") || "[]");

    atualizarLista();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const filme = {
            titulo: document.getElementById("titulo").value,
            descricao: document.getElementById("descricao").value,
            genero: document.getElementById("genero").value,
            classificacao: document.getElementById("classificacao").value,
            duracao: parseInt(document.getElementById("duracao").value),
            dataEstreia: document.getElementById("dataEstreia").value
        };
        filmes.push(filme);
        localStorage.setItem("filmes", JSON.stringify(filmes));
        atualizarLista();
        form.reset();
    });

    function atualizarLista() {
        listaFilmes.innerHTML = "";
        filmes.forEach(f => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = `${f.titulo} - ${f.genero} (${f.classificacao})`;
            listaFilmes.appendChild(li);
        });
    }
});
