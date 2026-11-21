
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // NAVEGAÇÃO
    // ==========================================

    const links = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    const pageTitle = document.getElementById('page-title');
    const breadcrumb = document.getElementById('breadcrumb');

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
    // ELEMENTOS DOS COLABORADORES
    // ==========================================

    const tabelaColaboradores = document.getElementById('tabela-colaboradores');
    const contadorColaboradores = document.getElementById('contador-colaboradores');
    const totalColaboradores = document.getElementById('total-colaboradores');

    const mensagemColaboradores = document.getElementById('mensagem-colaboradores');
    const buscaColaborador = document.getElementById('busca-colaborador');

    const modalColaborador = document.getElementById('modal-colaborador');
    const formColaborador = document.getElementById('form-colaborador');

    const btnNovoColaborador = document.getElementById('btn-novo-colaborador');
    const btnSalvarColaborador = document.getElementById('btn-salvar-colaborador');

    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const cargoInput = document.getElementById('cargo');

    const erroFormulario = document.getElementById('erro-formulario');

    // IDs conforme o HTML atual
    const btnFecharModal = document.getElementById('fechar-modal');
    const btnCancelarModal = document.getElementById('cancelar-modal');

    let colaboradores = [];

    // ==========================================
    // ELEMENTOS DOS EQUIPAMENTOS
    // ==========================================

    const tabelaEquipamentos = document.getElementById('tabela-equipamentos');
    const contadorEquipamentos = document.getElementById('contador-equipamentos');
    const totalEquipamentos = document.getElementById('total-equipamentos');

    const mensagemEquipamentos = document.getElementById('mensagem-equipamentos');
    const buscaEquipamento = document.getElementById('busca-equipamento');

    const modalEquipamento = document.getElementById('modal-equipamento');
    const formEquipamento = document.getElementById('form-equipamento');

    const btnNovoEquipamento = document.getElementById('btn-novo-equipamento');
    const btnSalvarEquipamento = document.getElementById('btn-salvar-equipamento');

    const patrimonioInput = document.getElementById('patrimonio');
    const nomeEquipamentoInput = document.getElementById('nome-equipamento');
    const tipoEquipamentoInput = document.getElementById('tipo-equipamento');

    const erroFormularioEquipamento = document.getElementById('erro-formulario-equipamento');

    const btnFecharModalEquipamento = document.getElementById('fechar-modal-equipamento');
    const btnCancelarModalEquipamento = document.getElementById('cancelar-modal-equipamento');

    let equipamentos = [];

    // ==========================================
    // MENSAGENS
    // ==========================================

    function mostrarMensagem(elemento, mensagem, tipo) {
        if (!elemento) return;

        elemento.textContent = mensagem;
        elemento.className = `notification ${tipo}`;
    }

    function esconderMensagem(elemento) {
        if (!elemento) return;

        elemento.textContent = '';
        elemento.className = 'notification hidden';
    }

    // ==========================================
    // NAVEGAÇÃO ENTRE AS PÁGINAS
    // ==========================================

    links.forEach(link => {

        link.addEventListener('click', event => {

            event.preventDefault();

            const pageId = link.dataset.page;

            pages.forEach(page => page.classList.remove('active'));
            links.forEach(item => item.classList.remove('active'));

            const selectedPage = document.getElementById(pageId);

            if (!selectedPage) return;

            selectedPage.classList.add('active');
            link.classList.add('active');

            if (pageTitle) {
                pageTitle.textContent = link.textContent.trim();
            }

            if (breadcrumb) {
                breadcrumb.textContent = link.textContent.trim();
            }

            if (pageId === 'colaboradores') {
                listarColaboradores();
            }

            if (pageId === 'equipamentos') {
                listarEquipamentos();
            }

        });

    });

    // ==========================================
    // LISTAR COLABORADORES
    // ==========================================

    async function listarColaboradores() {

        if (!tabelaColaboradores) return;

        tabelaColaboradores.innerHTML = `
            <tr>
                <td colspan="4" class="table-message">
                    Carregando colaboradores...
                </td>
            </tr>
        `;

        try {

            colaboradores = await API.get('/colaboradores');

            renderizarColaboradores(colaboradores);

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

            mostrarMensagem(mensagemColaboradores, error.message, 'error');

        }

    }

    // ==========================================
    // RENDERIZAR COLABORADORES
    // ==========================================

    function renderizarColaboradores(lista) {

        if (!tabelaColaboradores) return;

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

                const valores = [
                    colaborador.id,
                    colaborador.nome,
                    colaborador.email,
                    colaborador.cargo
                ];

                valores.forEach(valor => {
                    const coluna = document.createElement('td');
                    coluna.textContent = valor ?? '-';
                    linha.appendChild(coluna);
                });

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
    // MODAL DE COLABORADORES
    // ==========================================

    if (btnNovoColaborador && modalColaborador) {

        btnNovoColaborador.addEventListener('click', () => {

            formColaborador.reset();
            esconderMensagem(erroFormulario);

            modalColaborador.showModal();
            nomeInput?.focus();

        });

    }

    function fecharModalColaborador() {

        if (modalColaborador) {
            modalColaborador.close();
        }

        formColaborador?.reset();
        esconderMensagem(erroFormulario);

    }

    btnFecharModal?.addEventListener('click', fecharModalColaborador);
    btnCancelarModal?.addEventListener('click', fecharModalColaborador);

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

                await API.post('/colaboradores', colaborador);

                fecharModalColaborador();

                mostrarMensagem(
                    mensagemColaboradores,
                    'Novo colaborador cadastrado com sucesso!',
                    'success'
                );

                await listarColaboradores();

            } catch (error) {

                console.error('Erro ao cadastrar colaborador:', error);

                mostrarMensagem(erroFormulario, error.message, 'error');

            } finally {

                btnSalvarColaborador.disabled = false;
                btnSalvarColaborador.textContent = 'Salvar colaborador';

            }

        });

    }

    // ==========================================
    // LISTAR EQUIPAMENTOS
    // ==========================================

    async function listarEquipamentos() {

        if (!tabelaEquipamentos) return;

        tabelaEquipamentos.innerHTML = `
            <tr>
                <td colspan="5" class="table-message">
                    Carregando equipamentos...
                </td>
            </tr>
        `;

        try {

            equipamentos = await API.get('/equipamentos');

            renderizarEquipamentos(equipamentos);

            if (totalEquipamentos) {
                totalEquipamentos.textContent = equipamentos.length;
            }

        } catch (error) {

            console.error('Erro ao listar equipamentos:', error);

            tabelaEquipamentos.innerHTML = `
                <tr>
                    <td colspan="5" class="table-message">
                        Não foi possível carregar os equipamentos.
                    </td>
                </tr>
            `;

            mostrarMensagem(mensagemEquipamentos, error.message, 'error');

        }

    }

    // ==========================================
    // RENDERIZAR EQUIPAMENTOS
    // ==========================================

    function formatarTipo(tipo) {

        const tipos = {
            NOTEBOOK: 'Notebook',
            MONITOR: 'Monitor',
            PROJETOR: 'Projetor',
            IMPRESSORA: 'Impressora',
            HEADSET: 'Headset'
        };

        return tipos[tipo] || tipo || '-';

    }

    function renderizarEquipamentos(lista) {

        if (!tabelaEquipamentos) return;

        tabelaEquipamentos.innerHTML = '';

        if (!lista || lista.length === 0) {

            tabelaEquipamentos.innerHTML = `
                <tr>
                    <td colspan="5" class="table-message">
                        Nenhum equipamento cadastrado.
                    </td>
                </tr>
            `;

        } else {

            lista.forEach(equipamento => {

                const linha = document.createElement('tr');

                const id = document.createElement('td');
                id.textContent = equipamento.id ?? '-';

                const patrimonio = document.createElement('td');
                patrimonio.textContent = equipamento.patrimonio ?? '-';

                const nome = document.createElement('td');
                nome.textContent = equipamento.nome ?? '-';

                const tipo = document.createElement('td');
                tipo.textContent = formatarTipo(equipamento.tipo);

                const status = document.createElement('td');

                const etiqueta = document.createElement('span');

                etiqueta.textContent = equipamento.disponivel
                    ? 'Disponível'
                    : 'Emprestado';

                etiqueta.className = equipamento.disponivel
                    ? 'status-disponivel'
                    : 'status-emprestado';

                status.appendChild(etiqueta);

                linha.appendChild(id);
                linha.appendChild(patrimonio);
                linha.appendChild(nome);
                linha.appendChild(tipo);
                linha.appendChild(status);

                tabelaEquipamentos.appendChild(linha);

            });

        }

        if (contadorEquipamentos) {
            contadorEquipamentos.textContent =
                `${lista.length} equipamento(s)`;
        }

    }

    // ==========================================
    // BUSCAR EQUIPAMENTO
    // ==========================================

    if (buscaEquipamento) {

        buscaEquipamento.addEventListener('input', () => {

            const termo = buscaEquipamento.value.toLowerCase().trim();

            const resultado = equipamentos.filter(equipamento => {

                const patrimonio = (equipamento.patrimonio || '').toLowerCase();
                const nome = (equipamento.nome || '').toLowerCase();
                const tipo = formatarTipo(equipamento.tipo).toLowerCase();

                return patrimonio.includes(termo)
                    || nome.includes(termo)
                    || tipo.includes(termo);

            });

            renderizarEquipamentos(resultado);

        });

    }

    // ==========================================
    // ABRIR MODAL DE EQUIPAMENTOS
    // ==========================================

    if (btnNovoEquipamento && modalEquipamento) {

        btnNovoEquipamento.addEventListener('click', () => {

            formEquipamento.reset();
            esconderMensagem(erroFormularioEquipamento);

            modalEquipamento.showModal();
            patrimonioInput?.focus();

        });

    }

    // ==========================================
    // FECHAR MODAL DE EQUIPAMENTOS
    // ==========================================

    function fecharModalEquipamento() {

        if (modalEquipamento) {
            modalEquipamento.close();
        }

        formEquipamento?.reset();
        esconderMensagem(erroFormularioEquipamento);

    }

    btnFecharModalEquipamento?.addEventListener(
        'click',
        fecharModalEquipamento
    );

    btnCancelarModalEquipamento?.addEventListener(
        'click',
        fecharModalEquipamento
    );

    // ==========================================
    // CADASTRAR EQUIPAMENTO
    // ==========================================

    if (formEquipamento) {

        formEquipamento.addEventListener('submit', async event => {

            event.preventDefault();

            esconderMensagem(erroFormularioEquipamento);

            const equipamento = {
                patrimonio: patrimonioInput.value.trim(),
                nome: nomeEquipamentoInput.value.trim(),
                tipo: tipoEquipamentoInput.value
            };

            if (
                !equipamento.patrimonio
                || !equipamento.nome
                || !equipamento.tipo
            ) {

                mostrarMensagem(
                    erroFormularioEquipamento,
                    'Preencha todos os campos.',
                    'error'
                );

                return;
            }

            btnSalvarEquipamento.disabled = true;
            btnSalvarEquipamento.textContent = 'Salvando...';

            try {

                await API.post('/equipamentos', equipamento);

                fecharModalEquipamento();

                mostrarMensagem(
                    mensagemEquipamentos,
                    'Novo equipamento cadastrado com sucesso!',
                    'success'
                );

                await listarEquipamentos();

            } catch (error) {

                console.error('Erro ao cadastrar equipamento:', error);

                mostrarMensagem(
                    erroFormularioEquipamento,
                    error.message,
                    'error'
                );

            } finally {

                btnSalvarEquipamento.disabled = false;
                btnSalvarEquipamento.textContent = 'Salvar equipamento';

            }

        });

    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    listarColaboradores();
    listarEquipamentos();

});
