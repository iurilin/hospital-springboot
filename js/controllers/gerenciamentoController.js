// Funções de autenticação
function saveAuth(data) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userName', data.user.nome);
}

function clearAuth() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
}

function isLogged() {
    return !!localStorage.getItem('authToken');
}

function getUserName() {
    return localStorage.getItem('userName') || 'Admin';
}

function renderHeader(navContainerId) {
    const nav = document.getElementById(navContainerId);
    if (!nav) {
        console.error('Elemento navButtons não encontrado');
        return;
    }

    nav.innerHTML = '';

    if (isLogged()) {
        const avatar = document.createElement('div');
        avatar.className = 'user-avatar';
        avatar.textContent = getUserName().trim().charAt(0).toUpperCase();
        avatar.title = 'Clique para sair';
        avatar.style.cursor = 'pointer';
        avatar.onclick = function() {
            if (confirm('Sair da conta?')) {
                clearAuth();
                renderHeader(navContainerId);
                window.location.href = '/views/dashboard.html';
            }
        };
        nav.appendChild(avatar);
    }
}

// Função para trocar abas
function switchTabs(tabId) {
    console.log('🔄 Trocando para aba:', tabId);

    const allTabs = document.querySelectorAll('.tab');
    allTabs.forEach(function(tab) {
        tab.classList.remove('active');
    });

    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(function(content) {
        content.classList.remove('active');
    });

    const targetTab = document.querySelector('.tab[data-tab="' + tabId + '"]');
    if (targetTab) {
        targetTab.classList.add('active');
        console.log('✅ Aba ativada:', tabId);
    } else {
        console.error('❌ Aba não encontrada:', tabId);
    }

    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
        console.log('✅ Conteúdo ativado:', tabId);
    } else {
        console.error('❌ Conteúdo não encontrado:', tabId);
    }
}

// Função de busca
function setupSearch(inputId, tableId) {
    const searchInput = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    
    if (searchInput && table) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = table.getElementsByTagName('tr');
            
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const text = row.textContent.toLowerCase();
                
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    }
}

// Configurar botões de editar
function setupEditButtons() {
    const editButtons = document.querySelectorAll('.btn-editar');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Funcionalidade de edição em desenvolvimento');
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM carregado - Gerenciamento');

    if (!isLogged()) {
        console.log('⚠️ Usuário não logado, criando sessão fake');
        saveAuth({ token: 'admin-session', user: { nome: 'Admin' } });
    }

    renderHeader('navButtons');

    // Configurar abas
    const tabs = document.querySelectorAll('.tab');
    console.log('📋 Total de abas encontradas:', tabs.length);

    tabs.forEach(function(tab, index) {
        const tabId = tab.getAttribute('data-tab');
        console.log('🔗 Configurando aba ' + (index + 1) + ':', tabId);

        tab.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Clique na aba:', tabId);
            switchTabs(tabId);
        });
    });

    // Configurar busca para ambas as abas
    setupSearch('searchPacientes', 'pacientesTable');
    setupSearch('searchProfissionais', 'profissionaisTable');
    
    // Configurar botões de editar
    setupEditButtons();
    
    console.log('✅ Gerenciamento inicializado com sucesso');
});