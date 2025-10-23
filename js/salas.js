document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formSalas");
    const listaSalas = document.getElementById("listaSalas");
    let salas = JSON.parse(localStorage.getItem("salas") || "[]");

    atualizarLista();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const sala = {
            nome: document.getElementById("nomeSala").value,
            capacidade: parseInt(document.getElementById("capacidade").value),
            tipo: document.getElementById("tipoSala").value
        };
        salas.push(sala);
        localStorage.setItem("salas", JSON.stringify(salas));
        atualizarLista();
        form.reset();
    });

    function atualizarLista() {
        if (!listaSalas) return;
        listaSalas.innerHTML = "";
        salas.forEach(s => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = `${s.nome} - ${s.tipo} | Capacidade: ${s.capacidade}`;
            listaSalas.appendChild(li);
        });
    }
});
