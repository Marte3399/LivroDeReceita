// Get DOM elements
const darkModeToggle = document.getElementById('darkModeToggle');

// Check if dark mode is enabled
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize dark mode state
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Handle dark mode toggle
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const configForm = document.getElementById('configForm');
    
    // Carregar configurações salvas
    loadSavedSettings();
    
    // Salvar configurações quando o formulário for enviado
    configForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveSettings();
    });
    
    function loadSavedSettings() {
        // Carregar tamanho da fonte
        const fontSize = localStorage.getItem('fontSize') || 'medium';
        document.getElementById('fontSize').value = fontSize;
        document.body.style.fontSize = getFontSize(fontSize);
        
        // Carregar idioma
        const language = localStorage.getItem('language') || 'pt-BR';
        document.getElementById('language').value = language;
        
        // Carregar notificações
        const notifications = localStorage.getItem('notifications') === 'true';
        document.getElementById('notifications').checked = notifications;
        
        // Carregar auto save
        const autoSave = localStorage.getItem('autoSave') !== 'false';
        document.getElementById('autoSave').checked = autoSave;
    }
    
    function saveSettings() {
        // Salvar tamanho da fonte
        const fontSize = document.getElementById('fontSize').value;
        localStorage.setItem('fontSize', fontSize);
        document.body.style.fontSize = getFontSize(fontSize);
        
        // Salvar idioma
        const language = document.getElementById('language').value;
        localStorage.setItem('language', language);
        
        // Salvar notificações
        const notifications = document.getElementById('notifications').checked;
        localStorage.setItem('notifications', notifications);
        
        // Salvar auto save
        const autoSave = document.getElementById('autoSave').checked;
        localStorage.setItem('autoSave', autoSave);
        
        // Mostrar mensagem de sucesso
        showNotification('Configurações salvas com sucesso!');
    }
    
    function getFontSize(size) {
        switch(size) {
            case 'small': return '14px';
            case 'large': return '18px';
            default: return '16px';
        }
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remover notificação após 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});
