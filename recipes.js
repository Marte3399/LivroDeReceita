// YouTube API Key - Replace with your API key
const YOUTUBE_API_KEY = 'YOUR_API_KEY';

// Get DOM elements
const recipeForm = document.getElementById('recipeForm');
const recipesTableBody = document.getElementById('recipesTableBody');
const youtubeModal = document.getElementById('youtubeModal');
const closeModal = document.querySelector('.close-modal');
const searchButton = document.getElementById('searchButton');
const youtubeSearch = document.getElementById('youtubeSearch');
const searchResults = document.getElementById('searchResults');
const btnSearchVideo = document.querySelector('.btn-search-video');
const searchInput = document.getElementById('searchInput');
const tipoSelect = document.querySelectorAll('input[name="tipo"]');

// Receitas pré-cadastradas
const defaultRecipes = [
    {
        id: 1,
        nome: "Bolo de Chocolate",
        tipo: "doce",
        tempoPreparo: "45",
        porcoes: "8",
        ingredientes: [
            "2 xícaras de farinha de trigo",
            "1 xícara de chocolate em pó",
            "2 xícaras de açúcar",
            "2 ovos",
            "1 xícara de leite",
            "1/2 xícara de óleo",
            "1 colher de fermento"
        ],
        preparo: "1. Misture os ingredientes secos\n2. Adicione os líquidos\n3. Asse por 40 minutos a 180°C",
        videoUrl: "https://www.youtube.com/embed/4KRwxKGtGxk"
    },
    {
        id: 2,
        nome: "Pão de Queijo",
        tipo: "salgado",
        tempoPreparo: "30",
        porcoes: "20",
        ingredientes: [
            "500g de polvilho azedo",
            "1 xícara de leite",
            "1/2 xícara de óleo",
            "2 ovos",
            "200g de queijo minas"
        ],
        preparo: "1. Escalde o polvilho\n2. Adicione os ingredientes\n3. Asse por 20 minutos",
        videoUrl: "https://www.youtube.com/embed/y0PWZjhvpr4"
    }
];

// Load recipes from localStorage or initialize with default recipes
let recipes = JSON.parse(localStorage.getItem('customRecipes')) || defaultRecipes;
let customFavorites = JSON.parse(localStorage.getItem('customFavorites')) || [1, 2]; // Pré-favoritar as receitas default

// Save initial state if not exists
if (!localStorage.getItem('customRecipes')) {
    localStorage.setItem('customRecipes', JSON.stringify(recipes));
    localStorage.setItem('customFavorites', JSON.stringify(customFavorites));
}

// Function to save recipes to localStorage
function saveRecipes() {
    localStorage.setItem('customRecipes', JSON.stringify(recipes));
}

// Function to save custom favorites to localStorage
function saveCustomFavorites() {
    localStorage.setItem('customFavorites', JSON.stringify(customFavorites));
}

// YouTube search modal functions
function openYoutubeModal() {
    youtubeModal.classList.add('active');
}

function closeYoutubeModal() {
    youtubeModal.classList.remove('active');
}

// YouTube search function
async function searchYouTube(query) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=9&key=${YOUTUBE_API_KEY}`);
        const data = await response.json();
        
        searchResults.innerHTML = '';
        
        data.items.forEach(item => {
            const videoDiv = document.createElement('div');
            videoDiv.className = 'video-result';
            videoDiv.innerHTML = `
                <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}">
                <div class="video-result-info">
                    <h3>${item.snippet.title}</h3>
                    <p>${item.snippet.channelTitle}</p>
                </div>
            `;
            
            videoDiv.addEventListener('click', () => {
                const videoUrl = `https://www.youtube.com/watch?v=${item.id.videoId}`;
                document.querySelector('.videoUrl').value = videoUrl;
                closeYoutubeModal();
            });
            
            searchResults.appendChild(videoDiv);
        });
    } catch (error) {
        console.error('Error searching YouTube:', error);
        searchResults.innerHTML = '<p>Erro ao buscar vídeos. Tente novamente.</p>';
    }
}

// Event listeners for YouTube search
btnSearchVideo.addEventListener('click', openYoutubeModal);
closeModal.addEventListener('click', closeYoutubeModal);
searchButton.addEventListener('click', () => searchYouTube(youtubeSearch.value));
youtubeSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchYouTube(youtubeSearch.value);
    }
});

// Click outside modal to close
youtubeModal.addEventListener('click', (e) => {
    if (e.target === youtubeModal) {
        closeYoutubeModal();
    }
});

// Add variable to track which recipe is being edited
let editingRecipeIndex = -1;

// Function to add new recipe
function addRecipe(e) {
    e.preventDefault();
    
    // Check if we are editing a recipe
    if (editingRecipeIndex !== -1) {
        // Update the existing recipe
        const updatedRecipe = {
            id: recipes[editingRecipeIndex].id,
            nome: document.querySelector('input[name="nome"]').value,
            tipo: document.getElementById('tipoReceita').value,
            tempoPreparo: document.querySelector('input[name="tempoPreparo"]').value,
            porcoes: document.querySelector('input[name="porcoes"]').value,
            ingredientes: document.querySelector('textarea[name="ingredientes"]').value
                .split('\n')
                .filter(ing => ing.trim() !== ''),
            preparo: document.querySelector('textarea[name="preparo"]').value,
            videoUrl: document.querySelector('input[name="videoUrl"]').value
        };
        recipes[editingRecipeIndex] = updatedRecipe;
        editingRecipeIndex = -1;
    } else {
        // Get the selected tipo from the hidden input
        const tipoSelected = document.getElementById('tipoReceita').value;
        if (!tipoSelected) {
            alert('Por favor, selecione o tipo da receita (doce ou salgado)');
            return;
        }
        
        const newRecipe = {
            id: Date.now(),
            nome: document.querySelector('input[name="nome"]').value,
            tipo: tipoSelected,
            tempoPreparo: document.querySelector('input[name="tempoPreparo"]').value,
            porcoes: document.querySelector('input[name="porcoes"]').value,
            ingredientes: document.querySelector('textarea[name="ingredientes"]').value
                .split('\n')
                .filter(ing => ing.trim() !== ''),
            preparo: document.querySelector('textarea[name="preparo"]').value,
            videoUrl: document.querySelector('input[name="videoUrl"]').value
        };

        recipes.push(newRecipe);
    }
    saveRecipes();
    recipeForm.reset();
    // Reset the active state of tipo buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    // Clear the hidden input
    document.getElementById('tipoReceita').value = '';
    // Reset submit button text
    const submitButton = recipeForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Cadastrar Receita';
    renderRecipes();
}

// Function to edit recipe
function editRecipe(index) {
    // Save the index of the recipe being edited
    editingRecipeIndex = index;
    const recipe = recipes[index];
    
    // Fill in basic fields
    document.querySelector('input[name="nome"]').value = recipe.nome;
    document.querySelector('input[name="tempoPreparo"]').value = recipe.tempoPreparo;
    document.querySelector('input[name="porcoes"]').value = recipe.porcoes;
    
    // Set recipe type
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === recipe.tipo) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    document.getElementById('tipoReceita').value = recipe.tipo;
    
    // Fill in ingredients - handle both array and string formats
    const ingredientesTextarea = document.querySelector('textarea[name="ingredientes"]');
    if (Array.isArray(recipe.ingredientes)) {
        ingredientesTextarea.value = recipe.ingredientes.join('\n');
    } else if (typeof recipe.ingredientes === 'string') {
        ingredientesTextarea.value = recipe.ingredientes;
    }
    
    // Fill in preparation steps
    document.querySelector('textarea[name="preparo"]').value = recipe.preparo || '';
    
    // Fill in video URL
    document.querySelector('input[name="videoUrl"]').value = recipe.videoUrl || '';
    
    // Change submit button text to indicate editing
    const submitButton = recipeForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Atualizar Receita';
}

// Function to render recipes table
function renderRecipes() {
    recipesTableBody.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const row = document.createElement('tr');
        const isFavorite = customFavorites.includes(recipe.id);
        row.innerHTML = `
            <td>${recipe.nome}</td>
            <td>${recipe.tempoPreparo} min</td>
            <td>${recipe.porcoes} porções</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editRecipe(${index})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-delete" onclick="deleteRecipe(${index})">
                        <i class="fas fa-trash"></i> Deletar
                    </button>
                    <button class="btn btn-favorite ${isFavorite ? 'active' : ''}" onclick="toggleCustomFavorite(${recipe.id}, this)">
                        <i class="fas fa-star"></i> ${isFavorite ? 'Favoritado' : 'Favoritar'}
                    </button>
                </div>
            </td>
        `;
        recipesTableBody.appendChild(row);
    });
}

// Function to toggle custom favorite status
function toggleCustomFavorite(recipeId, button) {
    const index = customFavorites.indexOf(recipeId);
    
    if (index === -1) {
        customFavorites.push(recipeId);
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-star"></i> Favoritado';
    } else {
        customFavorites.splice(index, 1);
        button.classList.remove('active');
        button.innerHTML = '<i class="fas fa-star"></i> Favoritar';
    }
    
    saveCustomFavorites();
}

// Function to delete recipe
function deleteRecipe(index) {
    if (!confirm('Tem certeza que deseja deletar esta receita?')) {
        return;
    }
    
    const recipe = recipes[index];
    // Remove from favorites if it was favorited
    const favIndex = customFavorites.indexOf(recipe.id);
    if (favIndex !== -1) {
        customFavorites.splice(favIndex, 1);
        saveCustomFavorites();
    }
    
    recipes.splice(index, 1);
    saveRecipes();
    renderRecipes();
}

// Function to filter recipes
function filterRecipes() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedTipo = document.querySelector('input[name="tipo"]:checked')?.value || 'todos';
    
    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.nome.toLowerCase().includes(searchTerm);
        const matchesTipo = selectedTipo === 'todos' || recipe.tipo === selectedTipo;
        return matchesSearch && matchesTipo;
    });
    
    renderFilteredRecipes(filteredRecipes);
}

// Function to render filtered recipes
function renderFilteredRecipes(filteredRecipes) {
    recipesTableBody.innerHTML = '';
    filteredRecipes.forEach((recipe, index) => {
        const row = document.createElement('tr');
        const isFavorite = customFavorites.includes(recipe.id);
        row.innerHTML = `
            <td>${recipe.nome}</td>
            <td>${recipe.tempoPreparo} min</td>
            <td>${recipe.porcoes} porções</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editRecipe(${recipes.indexOf(recipe)})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-delete" onclick="deleteRecipe(${recipes.indexOf(recipe)})">
                        <i class="fas fa-trash"></i> Deletar
                    </button>
                    <button class="btn btn-favorite ${isFavorite ? 'active' : ''}" onclick="toggleCustomFavorite(${recipe.id}, this)">
                        <i class="fas fa-star"></i> ${isFavorite ? 'Favoritado' : 'Favoritar'}
                    </button>
                </div>
            </td>
        `;
        recipesTableBody.appendChild(row);
    });
}

// Recipe type selection
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Update hidden input value
        document.getElementById('tipoReceita').value = button.dataset.filter;
    });
});

// Event listeners
recipeForm.addEventListener('submit', addRecipe);
if (searchInput) {
    searchInput.addEventListener('input', filterRecipes);
}
tipoSelect.forEach(radio => {
    radio.addEventListener('change', filterRecipes);
});

// Initial render
renderRecipes();
