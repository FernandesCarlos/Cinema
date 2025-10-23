document.addEventListener("DOMContentLoaded", () => {
    const menuHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html">Cinema</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarMenu">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="cadastro-filmes.html">Filmes</a></li>
                        <li class="nav-item"><a class="nav-link" href="cadastro-salas.html">Salas</a></li>
                        <li class="nav-item"><a class="nav-link" href="cadastro-sessoes.html">Sessões</a></li>
                        <li class="nav-item"><a class="nav-link" href="venda-ingressos.html">Ingressos</a></li>
                        <li class="nav-item"><a class="nav-link" href="sessoes.html">Sessões Disponíveis</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", menuHTML);
});
