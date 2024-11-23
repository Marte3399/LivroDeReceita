// Get DOM elements
const favoritesGrid = document.getElementById('favoritesGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Import recipes data
const recipes = [
    // Receitas Doces
    {
        id: 1,
        nome: "Bolo de Chocolate",
        tipo: "doce",
        tempoPreparo: "45",
        porcoes: "8 porções",
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
        videoUrl: "https://www.youtube.com/embed/watch?v=4KRwxKGtGxk"
    },
    {
        id: 2,
        nome: "Pudim de Leite",
        tipo: "doce",
        tempoPreparo: "60",
        porcoes: "6 porções",
        ingredientes: [
            "1 lata de leite condensado",
            "1 lata de leite",
            "3 ovos",
            "1 xícara de açúcar para calda"
        ],
        preparo: "1. Faça a calda\n2. Bata os ingredientes no liquidificador\n3. Asse em banho-maria",
        videoUrl: "https://www.youtube.com/embed/watch?v=JZQzxQZXBfM"
    },
    {
        id: 3,
        nome: "Brigadeiro",
        tipo: "doce",
        tempoPreparo: "30",
        porcoes: "20 unidades",
        ingredientes: [
            "1 lata de leite condensado",
            "3 colheres de chocolate em pó",
            "1 colher de manteiga",
            "Chocolate granulado"
        ],
        preparo: "1. Misture tudo na panela\n2. Cozinhe até soltar do fundo\n3. Faça as bolinhas",
        videoUrl: "https://www.youtube.com/embed/watch?v=PfK5Y1JzW-U"
    },
    {
        id: 4,
        nome: "Mousse de Maracujá",
        tipo: "doce",
        tempoPreparo: "20",
        porcoes: "6 porções",
        ingredientes: [
            "1 lata de leite condensado",
            "1 lata de suco de maracujá",
            "1 lata de creme de leite"
        ],
        preparo: "1. Bata tudo no liquidificador\n2. Leve à geladeira",
        videoUrl: "https://www.youtube.com/embed/watch?v=jD1k-HWQtJo"
    },
    {
        id: 5,
        nome: "Pavê de Chocolate",
        tipo: "doce",
        tempoPreparo: "40",
        porcoes: "8 porções",
        ingredientes: [
            "1 pacote de bolacha maisena",
            "1 lata de leite condensado",
            "2 latas de leite",
            "2 colheres de amido de milho",
            "4 colheres de chocolate em pó"
        ],
        preparo: "1. Faça o creme\n2. Monte camadas\n3. Leve à geladeira",
        videoUrl: "https://www.youtube.com/embed/watch?v=TU5IJwGBv_Y"
    },
    // Receitas Salgadas
    {
        id: 11,
        nome: "Pão de Queijo",
        tipo: "salgado",
        tempoPreparo: "30",
        porcoes: "20 unidades",
        ingredientes: [
            "500g de polvilho azedo",
            "1 xícara de leite",
            "1/2 xícara de óleo",
            "2 ovos",
            "200g de queijo minas"
        ],
        preparo: "1. Escalde o polvilho\n2. Adicione os ingredientes\n3. Asse por 20 minutos",
        videoUrl: "https://www.youtube.com/embed/watch?v=y0PWZjhvpr4"
    },
    {
        id: 12,
        nome: "Coxinha",
        tipo: "salgado",
        tempoPreparo: "90",
        porcoes: "15 unidades",
        ingredientes: [
            "2 xícaras de farinha de trigo",
            "2 xícaras de caldo de galinha",
            "300g de frango desfiado",
            "1 cebola",
            "Temperos a gosto"
        ],
        preparo: "1. Faça a massa\n2. Prepare o recheio\n3. Modele e frite",
        videoUrl: "https://www.youtube.com/embed/watch?v=KFVZXyW7NsM"
    },
    {
        id: 13,
        nome: "Lasanha",
        tipo: "salgado",
        tempoPreparo: "60",
        porcoes: "8 porções",
        ingredientes: [
            "Massa de lasanha",
            "500g de carne moída",
            "Molho de tomate",
            "Queijo e presunto",
            "Molho branco"
        ],
        preparo: "1. Prepare os molhos\n2. Monte as camadas\n3. Asse por 45 minutos",
        videoUrl: "https://www.youtube.com/embed/watch?v=J_CvEM7FGXI"
    },
    {
        id: 14,
        nome: "Quiche de Legumes",
        tipo: "salgado",
        tempoPreparo: "50",
        porcoes: "6 porções",
        ingredientes: [
            "Massa de torta",
            "3 ovos",
            "200ml de creme de leite",
            "Legumes variados",
            "Queijo ralado"
        ],
        preparo: "1. Forre a forma com a massa\n2. Prepare o recheio\n3. Asse até dourar",
        videoUrl: "https://www.youtube.com/embed/watch?v=QK6jsQU4VU0"
    },
    {
        id: 15,
        nome: "Bolinho de Arroz",
        tipo: "salgado",
        tempoPreparo: "40",
        porcoes: "20 unidades",
        ingredientes: [
            "2 xícaras de arroz cozido",
            "2 ovos",
            "1/2 xícara de queijo ralado",
            "Salsinha",
            "Temperos a gosto"
        ],
        preparo: "1. Misture tudo\n2. Faça bolinhas\n3. Frite até dourar",
        videoUrl: "https://www.youtube.com/embed/watch?v=YG-nK_XzqQ8"
    }
];

// Current filter
let currentFilter = 'todos';

// Function to filter recipes
function filterRecipes(recipes, filter) {
    if (filter === 'todos') return recipes;
    return recipes.filter(recipe => recipe.tipo === filter);
}

// Function to render favorite recipes
function renderFavorites() {
    // Get both types of favorites from localStorage
    const indexFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const customFavorites = JSON.parse(localStorage.getItem('customFavorites') || '[]');
    
    // Get custom recipes
    const customRecipes = JSON.parse(localStorage.getItem('customRecipes') || '[]')
        .filter(recipe => customFavorites.includes(recipe.id));
    
    // Get index recipes
    const indexRecipes = recipes.filter(recipe => indexFavorites.includes(recipe.id));
    
    // Combine both types of recipes
    let allFavoriteRecipes = [...indexRecipes, ...customRecipes];
    
    // Apply type filter
    allFavoriteRecipes = filterRecipes(allFavoriteRecipes, currentFilter);
    
    // Clear the grid
    favoritesGrid.innerHTML = '';
    
    if (allFavoriteRecipes.length === 0) {
        favoritesGrid.innerHTML = `
            <div class="recipe-card">
                <h2>Nenhuma receita encontrada</h2>
                <p>${currentFilter === 'todos' ? 
                    'Você ainda não adicionou nenhuma receita aos favoritos.' : 
                    `Não há receitas ${currentFilter === 'doce' ? 'doces' : 'salgadas'} nos favoritos.`}</p>
            </div>
        `;
        return;
    }
    
    // Create a card for each favorite recipe
    allFavoriteRecipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        
        const isCustomRecipe = customFavorites.includes(recipe.id);
        
        // Format ingredients as list if it's an array
        const ingredientsList = Array.isArray(recipe.ingredientes) 
            ? recipe.ingredientes.map(ing => `<li>${ing}</li>`).join('')
            : recipe.ingredientes.split('\n').map(ing => `<li>${ing}</li>`).join('');
        
        card.innerHTML = `
            <h2>${recipe.nome}</h2>
            <div class="recipe-info">
                <span><i class="fas fa-clock"></i> ${recipe.tempoPreparo} min</span>
                <span><i class="fas fa-utensils"></i> ${recipe.porcoes} porções</span>
                ${isCustomRecipe ? '<span class="custom-badge">Receita Personalizada</span>' : ''}
            </div>
            <div class="recipe-section">
                <h3><i class="fas fa-list"></i> Ingredientes</h3>
                <ul class="ingredients-list">
                    ${ingredientsList}
                </ul>
            </div>
            <div class="recipe-section">
                <h3><i class="fas fa-book"></i> Modo de Preparo</h3>
                <p class="preparation-steps">${recipe.preparo}</p>
            </div>
            ${recipe.videoUrl ? `
            <div class="video-wrapper">
                <iframe src="${recipe.videoUrl}" frameborder="0" allowfullscreen></iframe>
            </div>
            ` : ''}
            <div class="card-actions">
                <button class="btn-favorite active" onclick="${isCustomRecipe ? 'toggleCustomFavorite' : 'toggleFavorite'}(${recipe.id}, this)">
                    <i class="fas fa-star"></i>
                    <span>Favoritado</span>
                </button>
            </div>
        `;
        favoritesGrid.appendChild(card);
    });
}

// Function to toggle favorite for index recipes
function toggleFavorite(recipeId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(recipeId);
    
    if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
    }
}

// Function to toggle favorite for custom recipes
function toggleCustomFavorite(recipeId, button) {
    let customFavorites = JSON.parse(localStorage.getItem('customFavorites') || '[]');
    const index = customFavorites.indexOf(recipeId);
    
    if (index !== -1) {
        customFavorites.splice(index, 1);
        localStorage.setItem('customFavorites', JSON.stringify(customFavorites));
        renderFavorites();
    }
}

// Add click handlers for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Update current filter
        currentFilter = button.dataset.filter;
        // Re-render favorites with new filter
        renderFavorites();
    });
});

// Add event listener for storage changes
window.addEventListener('storage', (e) => {
    if (e.key === 'favorites' || e.key === 'customFavorites') {
        renderFavorites();
    }
});

// Initial render
renderFavorites();
