
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ELEMENTOS DA NAVEGAÇÃO
    // ==========================================

    const links = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    const pageTitle = document.getElementById('page-title');
    const breadcrumb = document.getElementById('breadcrumb');

    // ==========================================
    // ELEMENTOS DOS COLABORADORES
    // ==========================================

    const tabelaColaboradores = document.getElementById('tabela-colaboradores');
    const contadorColaboradores = document.getElementById('contador-colaboradores');
    const totalColaboradores = document.getElementById('total-colaboradores');

    const mensagemColaboradores = document.getElementById('mensagem-colaboradores');
    const buscaColaborador = document.getElementById('busca-colaborador');

    // ==========================================
    // ELEMENTOS DO MODAL
    // ==========================================

    const modalColaborador = document.getElementById('modal-colaborador');
    const formColaborador = document.getElementById('form-colaborador');

    const btnNovoColaborador = document.getElementById('btn-novo-colaborador');
    const btnSalvarColaborador = document.getElementById('btn-salvar-colaborador');

    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const cargoInput = document.getElementById('cargo');

    const erroFormulario = document.getElementById('erro-formulario');

    const btnFecharModal = document.getElementById('btn-fechar-modal');
    const btnCancelarModal = document.getElementById('btn-cancelar-modal');

    // Armazena os colaboradores recebidos da API
    let colaboradores = [];

    // ==========================================
    // DATA ATUAL
    // ==========================================

    const currentDate = document.getElementById('current-date');

    if (currentDate) {
        currentDate.textContent = new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    // ==========================================
    // NAVEGAÇÃO ENTRE AS PÁGINAS
    // ==========================================

    links.forEach(link => {

        link.addEventListener('click', event => {

            event.preventDefault();

            const pageId = link.dataset.page;

            pages.forEach(page => {
                page.classList.remove('active');
            });

            links.forEach(item => {
                item.classList.remove('active');
            });

            const selectedPage = document.getElementById(pageId);

            if (!selectedPage) {
                return;
            }

            selectedPage.classList.add('active');
            link.classList.add('active');

            if (pageTitle) {
                pageTitle.textContent = link.textContent.trim();
            }

            if (breadcrumb) {
                breadcrumb.textContent = link.textContent.trim();
            }

            // Atualiza os colaboradores ao abrir essa página
            if (pageId === 'colaboradores') {
                listarColaboradores();
            }

        });

    });

    // ==========================================
    // MENSAGENS
    // ==========================================

    function mostrarMensagem(elemento, mensagem, tipo) {

        if (!elemento) {
            return;
        }

        elemento.textContent = mensagem;
        elemento.className = `notification ${tipo}`;

    }

    function esconderMensagem(elemento) {

        if (!elemento) {
            return;
        }

        elemento.textContent = '';
        elemento.className = 'notification hidden';

    }

    // ==========================================
    // LISTAR COLABORADORES
    // ==========================================

    async function listarColaboradores() {

        if (!tabelaColaboradores) {
            console.error('Tabela de colaboradores não encontrada no HTML.');
            return;
        }

        tabelaColaboradores.innerHTML = `
            <tr>
                <td colspan="4" class="table-message">
                    Carregando colaboradores...
                </td>
            </tr>
        `;

        try {

            // Consulta o endpoint GET /colaboradores
            colaboradores = await API.get('/colaboradores');

            console.log('Colaboradores recebidos:', colaboradores);

            renderizarColaboradores(colaboradores);

            // Atualiza o indicador do dashboard
            if (totalColaboradores) {
                totalColaboradores.textContent = colaboradores.length;
            }

        } catch (error) {

            console.error('Erro ao listar colaboradores:', error);

            tabelaColaboradores.innerHTML = `
                <tr>
                    <td colspan="4" class="table-message">
                        Não foi possível carregar os colaboradores.
                    </td>
                </tr>
            `;

            mostrarMensagem(
                mensagemColaboradores,
                error.message,
                'error'
            );

        }

    }

    // ==========================================
    // RENDERIZAR COLABORADORES NA TABELA
    // ==========================================

    function renderizarColaboradores(lista) {

        if (!tabelaColaboradores) {
            return;
        }

        tabelaColaboradores.innerHTML = '';

        if (!lista || lista.length === 0) {

            tabelaColaboradores.innerHTML = `
                <tr>
                    <td colspan="4" class="table-message">
                        Nenhum colaborador cadastrado.
                    </td>
                </tr>
            `;

        } else {

            lista.forEach(colaborador => {

                const linha = document.createElement('tr');

                const id = document.createElement('td');
                id.textContent = colaborador.id ?? '-';

                const nome = document.createElement('td');
                nome.textContent = colaborador.nome ?? '-';

                const email = document.createElement('td');
                email.textContent = colaborador.email ?? '-';

                const cargo = document.createElement('td');
                cargo.textContent = colaborador.cargo ?? '-';

                linha.appendChild(id);
                linha.appendChild(nome);
                linha.appendChild(email);
                linha.appendChild(cargo);

                tabelaColaboradores.appendChild(linha);

            });

        }

        if (contadorColaboradores) {
            contadorColaboradores.textContent =
                `${lista.length} colaborador(es)`;
        }

    }

    // ==========================================
    // BUSCAR COLABORADOR
    // ==========================================

    if (buscaColaborador) {

        buscaColaborador.addEventListener('input', () => {

            const termo = buscaColaborador.value.toLowerCase().trim();

            const resultado = colaboradores.filter(colaborador => {

                const nome = (colaborador.nome || '').toLowerCase();
                const email = (colaborador.email || '').toLowerCase();

                return nome.includes(termo) || email.includes(termo);

            });

            renderizarColaboradores(resultado);

        });

    }

    // ==========================================
    // ABRIR MODAL DE CADASTRO
    // ==========================================

    if (btnNovoColaborador && modalColaborador) {

        btnNovoColaborador.addEventListener('click', () => {

            formColaborador.reset();

            esconderMensagem(erroFormulario);

            modalColaborador.showModal();

            nomeInput?.focus();

        });

    }

    // ==========================================
    // FECHAR MODAL
    // ==========================================

    function fecharModal() {

        if (modalColaborador) {
            modalColaborador.close();
        }

        if (formColaborador) {
            formColaborador.reset();
        }

        esconderMensagem(erroFormulario);

    }

    if (btnFecharModal) {
        btnFecharModal.addEventListener('click', fecharModal);
    }

    if (btnCancelarModal) {
        btnCancelarModal.addEventListener('click', fecharModal);
    }

    // ==========================================
    // CADASTRAR COLABORADOR
    // ==========================================

    if (formColaborador) {

        formColaborador.addEventListener('submit', async event => {

            event.preventDefault();

            esconderMensagem(erroFormulario);

            const colaborador = {
                nome: nomeInput.value.trim(),
                email: emailInput.value.trim(),
                cargo: cargoInput.value.trim()
            };

            if (!colaborador.nome || !colaborador.email || !colaborador.cargo) {

                mostrarMensagem(
                    erroFormulario,
                    'Preencha todos os campos.',
                    'error'
                );

                return;
            }

            btnSalvarColaborador.disabled = true;
            btnSalvarColaborador.textContent = 'Salvando...';

            try {

                // Envia o cadastro para POST /colaboradores
                await API.post('/colaboradores', colaborador);

                fecharModal();

                mostrarMensagem(
                    mensagemColaboradores,
                    'Colaborador cadastrado com sucesso!',
                    'success'
                );

                // Busca novamente a lista atualizada
                await listarColaboradores();

            } catch (error) {

                console.error('Erro ao cadastrar colaborador:', error);

                mostrarMensagem(
                    erroFormulario,
                    error.message,
                    'error'
                );

            } finally {

                btnSalvarColaborador.disabled = false;
                btnSalvarColaborador.textContent = 'Salvar colaborador';

            }

        });

    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    // Busca os colaboradores assim que o dashboard abre
    listarColaboradores();

});
