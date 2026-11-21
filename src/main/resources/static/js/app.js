
document.addEventListener('DOMContentLoaded', () => {

    const links = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    const pageTitle = document.getElementById('page-title');
    const breadcrumb = document.getElementById('breadcrumb');

    // Navegação entre as páginas
    links.forEach(link => {

        link.addEventListener('click', event => {

            event.preventDefault();

            const pageId = link.dataset.page;

            // Remove a página ativa
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // Remove o link ativo
            links.forEach(item => {
                item.classList.remove('active');
            });

            // Ativa a página selecionada
            const selectedPage = document.getElementById(pageId);

            if (!selectedPage) {
                return;
            }

            selectedPage.classList.add('active');
            link.classList.add('active');

            // Atualiza os títulos
            pageTitle.textContent = link.textContent.trim();
            breadcrumb.textContent = link.textContent.trim();

        });

    });

    // Data atual
    const currentDate = document.getElementById('current-date');

    if (currentDate) {

        currentDate.textContent = new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

    }

    // Botões que serão implementados nas próximas etapas
    const buttons = [
        'btn-novo-colaborador',
        'btn-novo-equipamento',
        'btn-novo-emprestimo'
    ];

    buttons.forEach(buttonId => {

        const button = document.getElementById(buttonId);

        if (button) {
            button.addEventListener('click', () => {
                alert('Vamos implementar este formulário na próxima etapa!');
            });
        }

    });

});
