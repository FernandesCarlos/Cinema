document.addEventListener("DOMContentLoaded", () => {
    const menuHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html">Cinema</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="cadastro-filmes.html">Cadastro de Filmes</a></li>
                        <li class="nav-item"><a class="nav-link" href="cadastro-salas.html">Cadastro de Salas</a></li>
                        <li class="nav-item"><a class="nav-link" href="cadastro-sessoes.html">Cadastro de Sessões</a></li>
                        <li class="nav-item"><a class="nav-link" href="venda-ingressos.html">Venda de Ingressos</a></li>
                        <li class="nav-item"><a class="nav-link" href="sessoes.html">Sessões Disponíveis</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", menuHTML);
});
