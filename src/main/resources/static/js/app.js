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
    // ELEMENTOS DOS EMPRÉSTIMOS
    // ==========================================

    const tabelaEmprestimos = document.getElementById('tabela-emprestimos');

    const mensagemEmprestimos = document.getElementById('mensagem-emprestimos');

    const modalEmprestimo = document.getElementById('modal-emprestimo');
    const formEmprestimo = document.getElementById('form-emprestimo');

    const btnNovoEmprestimo = document.getElementById('btn-novo-emprestimo');
    const btnSalvarEmprestimo = document.getElementById('btn-salvar-emprestimo');
    const btnCancelarModalEmprestimo = document.getElementById('cancelar-modal-emprestimo');
    const btnFiltrarAtrasados = document.getElementById('btn-filtrar-atrasados');

    const selectColaboradorEmprestimo = document.getElementById('colaborador-emprestimo');
    const selectEquipamentoEmprestimo = document.getElementById('equipamento-emprestimo');

    const erroFormularioEmprestimo = document.getElementById('erro-formulario-emprestimo');

    const totalEmprestimosDashboard = document.getElementById('total-emprestimos');
    const totalDevolucoesDashboard = document.getElementById('total-devolucoes');

    const emprestimosAtivos = document.getElementById('emprestimos-ativos');
    const emprestimosAtrasados = document.getElementById('emprestimos-atrasados');
    const emprestimosDevolvidos = document.getElementById('emprestimos-devolvidos');

    let emprestimos = [];
    let filtroAtrasadosAtivo = false;

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
    // FUNÇÕES AUXILIARES
    // ==========================================

    function formatarData(data) {

        if (!data) return '-';

        // Evita problemas de fuso horário com datas no formato yyyy-MM-dd
        const partes = String(data).split('T')[0].split('-');

        if (partes.length !== 3) {
            return data;
        }

        const [ano, mes, dia] = partes;

        return `${dia}/${mes}/${ano}`;

    }

    function obterDataLocal() {

        const agora = new Date();

        const ano = agora.getFullYear();
        const mes = String(agora.getMonth() + 1).padStart(2, '0');
        const dia = String(agora.getDate()).padStart(2, '0');

        return `${ano}-${mes}-${dia}`;

    }

    function estaAtrasado(emprestimo) {

        if (emprestimo.dataDevolucao) {
            return false;
        }

        if (!emprestimo.dataPrevistaDevolucao) {
            return false;
        }

        return emprestimo.dataPrevistaDevolucao < obterDataLocal();

    }

    function encontrarColaborador(id) {

        return colaboradores.find(
            colaborador => String(colaborador.id) === String(id)
        );

    }

    function encontrarEquipamento(id) {

        return equipamentos.find(
            equipamento => String(equipamento.id) === String(id)
        );

    }

    // ==========================================
    // NAVEGAÇÃO ENTRE AS PÁGINAS
    // ==========================================

    links.forEach(link => {

        link.addEventListener('click', event => {

            event.preventDefault();

            const pageId = link.dataset.page;

            const selectedPage = document.getElementById(pageId);

            if (!selectedPage) return;

            pages.forEach(page => page.classList.remove('active'));
            links.forEach(item => item.classList.remove('active'));

            selectedPage.classList.add('active');
            link.classList.add('active');

            const titulo = link.textContent.trim();

            if (pageTitle) {
                pageTitle.textContent = titulo;
            }

            if (breadcrumb) {
                breadcrumb.textContent = titulo;
            }

            if (pageId === 'dashboard') {
                carregarDashboard();
            }

            if (pageId === 'colaboradores') {
                listarColaboradores();
            }

            if (pageId === 'equipamentos') {
                listarEquipamentos();
            }

            if (pageId === 'emprestimos') {
                filtroAtrasadosAtivo = false;

                if (btnFiltrarAtrasados) {
                    btnFiltrarAtrasados.textContent = 'Ver atrasados';
                }

                listarEmprestimos();
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
            contadorColaboradores.textContent = `${lista.length} colaborador(es)`;
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

        if (modalColaborador?.open) {
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
                await atualizarDadosDashboard();

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
            contadorEquipamentos.textContent = `${lista.length} equipamento(s)`;
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

        if (modalEquipamento?.open) {
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
                await atualizarDadosDashboard();

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
    // LISTAR EMPRÉSTIMOS
    // ==========================================

    async function listarEmprestimos() {

        if (!tabelaEmprestimos) return;

        tabelaEmprestimos.innerHTML = `
            <tr>
                <td colspan="8" class="table-message">
                    Carregando empréstimos...
                </td>
            </tr>
        `;

        try {

            const resultados = await Promise.all([
                API.get('/emprestimos'),
                API.get('/colaboradores'),
                API.get('/equipamentos')
            ]);

            emprestimos = resultados[0];
            colaboradores = resultados[1];
            equipamentos = resultados[2];

            atualizarIndicadoresEmprestimos();

            renderizarEmprestimos();

            // Atualiza também a tela de equipamentos
            // para refletir os equipamentos emprestados.
            renderizarEquipamentos(equipamentos);

            if (totalColaboradores) {
                totalColaboradores.textContent = colaboradores.length;
            }

            if (totalEquipamentos) {
                totalEquipamentos.textContent = equipamentos.length;
            }

        } catch (error) {

            console.error('Erro ao listar empréstimos:', error);

            tabelaEmprestimos.innerHTML = `
                <tr>
                    <td colspan="8" class="table-message">
                        Não foi possível carregar os empréstimos.
                    </td>
                </tr>
            `;

            mostrarMensagem(
                mensagemEmprestimos,
                error.message || 'Erro ao carregar os empréstimos.',
                'error'
            );

        }

    }

    // ==========================================
    // ATUALIZAR INDICADORES DE EMPRÉSTIMOS
    // ==========================================

    function atualizarIndicadoresEmprestimos() {

        const ativos = emprestimos.filter(
            emprestimo => !emprestimo.dataDevolucao
        );

        const atrasados = ativos.filter(
            emprestimo => estaAtrasado(emprestimo)
        );

        const devolvidos = emprestimos.filter(
            emprestimo => Boolean(emprestimo.dataDevolucao)
        );

        if (emprestimosAtivos) {
            emprestimosAtivos.textContent = ativos.length;
        }

        if (emprestimosAtrasados) {
            emprestimosAtrasados.textContent = atrasados.length;
        }

        if (emprestimosDevolvidos) {
            emprestimosDevolvidos.textContent = devolvidos.length;
        }

        if (totalEmprestimosDashboard) {
            totalEmprestimosDashboard.textContent = ativos.length;
        }

        if (totalDevolucoesDashboard) {
            totalDevolucoesDashboard.textContent = devolvidos.length;
        }

    }

    // ==========================================
    // RENDERIZAR EMPRÉSTIMOS
    // ==========================================

    function renderizarEmprestimos() {

        if (!tabelaEmprestimos) return;

        tabelaEmprestimos.innerHTML = '';

        let lista = [...emprestimos];

        if (filtroAtrasadosAtivo) {
            lista = lista.filter(emprestimo => estaAtrasado(emprestimo));
        }

        // Mais recentes primeiro
        lista.sort((a, b) => {
            return String(b.dataEmprestimo || '').localeCompare(
                String(a.dataEmprestimo || '')
            );
        });

        if (lista.length === 0) {

            tabelaEmprestimos.innerHTML = `
                <tr>
                    <td colspan="8" class="table-message">
                        ${
                filtroAtrasadosAtivo
                    ? 'Nenhum empréstimo atrasado.'
                    : 'Nenhum empréstimo cadastrado.'
            }
                    </td>
                </tr>
            `;

            return;
        }

        lista.forEach(emprestimo => {

            const colaborador = encontrarColaborador(emprestimo.colaboradorId);
            const equipamento = encontrarEquipamento(emprestimo.equipamentoId);

            const atrasado = estaAtrasado(emprestimo);
            const devolvido = Boolean(emprestimo.dataDevolucao);

            let statusTexto = 'Em andamento';
            let statusClasse = 'status-emprestado';

            if (devolvido) {
                statusTexto = 'Devolvido';
                statusClasse = 'status-disponivel';
            } else if (atrasado) {
                statusTexto = 'Atrasado';
                statusClasse = 'status-emprestado';
            }

            const linha = document.createElement('tr');

            const valores = [
                emprestimo.id,
                colaborador?.nome ?? `ID ${emprestimo.colaboradorId}`,
                equipamento?.nome ?? `ID ${emprestimo.equipamentoId}`,
                formatarData(emprestimo.dataEmprestimo),
                formatarData(emprestimo.dataPrevistaDevolucao),
                formatarData(emprestimo.dataDevolucao)
            ];

            valores.forEach(valor => {

                const coluna = document.createElement('td');
                coluna.textContent = valor ?? '-';

                linha.appendChild(coluna);

            });

            const colunaStatus = document.createElement('td');
            const etiquetaStatus = document.createElement('span');

            etiquetaStatus.textContent = statusTexto;
            etiquetaStatus.className = statusClasse;

            colunaStatus.appendChild(etiquetaStatus);
            linha.appendChild(colunaStatus);

            const colunaAcoes = document.createElement('td');

            if (!devolvido) {

                const botaoDevolver = document.createElement('button');

                botaoDevolver.type = 'button';
                botaoDevolver.className = 'btn-secondary';
                botaoDevolver.textContent = 'Devolver';

                botaoDevolver.addEventListener('click', () => {
                    devolverEmprestimo(emprestimo.id);
                });

                colunaAcoes.appendChild(botaoDevolver);

            } else {

                colunaAcoes.textContent = 'Concluído';

            }

            linha.appendChild(colunaAcoes);

            tabelaEmprestimos.appendChild(linha);

        });

    }

    // ==========================================
    // ABRIR MODAL DE EMPRÉSTIMO
    // ==========================================

    async function abrirModalEmprestimo() {

        formEmprestimo.reset();
        esconderMensagem(erroFormularioEmprestimo);

        btnSalvarEmprestimo.disabled = true;
        btnSalvarEmprestimo.textContent = 'Carregando...';

        try {

            const resultados = await Promise.all([
                API.get('/colaboradores'),
                API.get('/equipamentos?disponivel=true')
            ]);

            colaboradores = resultados[0];
            equipamentos = resultados[1];

            selectColaboradorEmprestimo.innerHTML = `
                <option value="">Selecione um colaborador</option>
            `;

            selectEquipamentoEmprestimo.innerHTML = `
                <option value="">Selecione um equipamento</option>
            `;

            colaboradores.forEach(colaborador => {

                const opcao = document.createElement('option');

                opcao.value = colaborador.id;
                opcao.textContent = `${colaborador.nome} (${colaborador.email})`;

                selectColaboradorEmprestimo.appendChild(opcao);

            });

            equipamentos.forEach(equipamento => {

                const opcao = document.createElement('option');

                opcao.value = equipamento.id;

                opcao.textContent =
                    `${equipamento.patrimonio} - ${equipamento.nome}`;

                selectEquipamentoEmprestimo.appendChild(opcao);

            });

            if (colaboradores.length === 0) {

                mostrarMensagem(
                    erroFormularioEmprestimo,
                    'Cadastre um colaborador antes de registrar um empréstimo.',
                    'error'
                );

            } else if (equipamentos.length === 0) {

                mostrarMensagem(
                    erroFormularioEmprestimo,
                    'Não existem equipamentos disponíveis para empréstimo.',
                    'error'
                );

            }

            modalEmprestimo.showModal();

        } catch (error) {

            console.error('Erro ao carregar formulário de empréstimo:', error);

            mostrarMensagem(
                mensagemEmprestimos,
                error.message || 'Não foi possível carregar os dados do formulário.',
                'error'
            );

        } finally {

            btnSalvarEmprestimo.disabled = false;
            btnSalvarEmprestimo.textContent = 'Registrar empréstimo';

        }

    }

    // ==========================================
    // FECHAR MODAL DE EMPRÉSTIMO
    // ==========================================

    function fecharModalEmprestimo() {

        if (modalEmprestimo?.open) {
            modalEmprestimo.close();
        }

        formEmprestimo?.reset();
        esconderMensagem(erroFormularioEmprestimo);

    }

    btnNovoEmprestimo?.addEventListener('click', abrirModalEmprestimo);

    btnCancelarModalEmprestimo?.addEventListener(
        'click',
        fecharModalEmprestimo
    );

    // ==========================================
    // CADASTRAR EMPRÉSTIMO
    // ==========================================

    if (formEmprestimo) {

        formEmprestimo.addEventListener('submit', async event => {

            event.preventDefault();

            esconderMensagem(erroFormularioEmprestimo);

            const colaboradorId = selectColaboradorEmprestimo.value;
            const equipamentoId = selectEquipamentoEmprestimo.value;

            if (!colaboradorId || !equipamentoId) {

                mostrarMensagem(
                    erroFormularioEmprestimo,
                    'Selecione um colaborador e um equipamento.',
                    'error'
                );

                return;
            }

            btnSalvarEmprestimo.disabled = true;
            btnSalvarEmprestimo.textContent = 'Registrando...';

            try {

                const url =
                    `/emprestimos?equipamentoId=${encodeURIComponent(equipamentoId)}`
                    + `&colaboradorId=${encodeURIComponent(colaboradorId)}`;

                await API.post(url);

                fecharModalEmprestimo();

                mostrarMensagem(
                    mensagemEmprestimos,
                    'Empréstimo registrado com sucesso!',
                    'success'
                );

                // Atualiza a tabela de empréstimos,
                // a tabela de equipamentos e os indicadores.
                await listarEmprestimos();

                // Atualiza os dados gerais do dashboard.
                await atualizarDadosDashboard();

            } catch (error) {

                console.error('Erro ao cadastrar empréstimo:', error);

                mostrarMensagem(
                    erroFormularioEmprestimo,
                    error.message || 'Não foi possível registrar o empréstimo.',
                    'error'
                );

            } finally {

                btnSalvarEmprestimo.disabled = false;
                btnSalvarEmprestimo.textContent = 'Registrar empréstimo';

            }

        });

    }

    // ==========================================
    // REGISTRAR DEVOLUÇÃO
    // ==========================================

    async function devolverEmprestimo(id) {

        const confirmar = confirm(
            'Deseja realmente registrar a devolução deste equipamento?'
        );

        if (!confirmar) return;

        try {

            await API.put(`/emprestimos/${id}/devolucao`);

            mostrarMensagem(
                mensagemEmprestimos,
                'Devolução registrada com sucesso!',
                'success'
            );

            // O backend atualiza a disponibilidade do equipamento.
            // Recarregamos as duas tabelas para refletir a alteração.
            await listarEmprestimos();

            await atualizarDadosDashboard();

        } catch (error) {

            console.error('Erro ao registrar devolução:', error);

            mostrarMensagem(
                mensagemEmprestimos,
                error.message || 'Não foi possível registrar a devolução.',
                'error'
            );

        }

    }

    // ==========================================
    // FILTRAR EMPRÉSTIMOS ATRASADOS
    // ==========================================

    btnFiltrarAtrasados?.addEventListener('click', () => {

        filtroAtrasadosAtivo = !filtroAtrasadosAtivo;

        btnFiltrarAtrasados.textContent = filtroAtrasadosAtivo
            ? 'Ver todos'
            : 'Ver atrasados';

        renderizarEmprestimos();

    });

    // ==========================================
    // ATUALIZAR DADOS DO DASHBOARD
    // ==========================================

    async function atualizarDadosDashboard() {

        try {

            const resultados = await Promise.all([
                API.get('/colaboradores'),
                API.get('/equipamentos'),
                API.get('/emprestimos')
            ]);

            const listaColaboradores = resultados[0];
            const listaEquipamentos = resultados[1];
            const listaEmprestimos = resultados[2];

            const ativos = listaEmprestimos.filter(
                emprestimo => !emprestimo.dataDevolucao
            );

            const devolvidos = listaEmprestimos.filter(
                emprestimo => Boolean(emprestimo.dataDevolucao)
            );

            if (totalColaboradores) {
                totalColaboradores.textContent = listaColaboradores.length;
            }

            if (totalEquipamentos) {
                totalEquipamentos.textContent = listaEquipamentos.length;
            }

            if (totalEmprestimosDashboard) {
                totalEmprestimosDashboard.textContent = ativos.length;
            }

            if (totalDevolucoesDashboard) {
                totalDevolucoesDashboard.textContent = devolvidos.length;
            }

        } catch (error) {

            console.error('Erro ao atualizar dashboard:', error);

        }

    }

    async function carregarDashboard() {

        await atualizarDadosDashboard();

    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    listarColaboradores();
    listarEquipamentos();
    carregarDashboard();

});