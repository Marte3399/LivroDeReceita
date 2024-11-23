// Receitas pré-cadastradas
const recipes = [
    // Receitas Doces
    {
        id: 1,
        name: "Bolo de Chocolate",
        type: "doce",
        time: "45 min",
        portions: "8 porções",
        ingredients: [
            "2 xícaras de farinha de trigo",
            "1 xícara de chocolate em pó",
            "2 xícaras de açúcar",
            "2 ovos",
            "1 xícara de leite",
            "1/2 xícara de óleo",
            "1 colher de fermento"
        ],
        preparation: "1. Misture os ingredientes secos\n2. Adicione os líquidos\n3. Asse por 40 minutos a 180°C",
        videoUrl: "https://www.youtube.com/embed/watch?v=4KRwxKGtGxk"
    },
    {
        id: 2,
        name: "Pudim de Leite",
        type: "doce",
        time: "60 min",
        portions: "6 porções",
        ingredients: [
            "1 lata de leite condensado",
            "1 lata de leite",
            "3 ovos",
            "1 xícara de açúcar para calda"
        ],
        preparation: "1. Faça a calda\n2. Bata os ingredientes no liquidificador\n3. Asse em banho-maria",
        videoUrl: "https://www.youtube.com/embed/watch?v=JZQzxQZXBfM"
    },
    {
        id: 3,
        name: "Brigadeiro",
        type: "doce",
        time: "30 min",
        portions: "20 unidades",
        ingredients: [
            "1 lata de leite condensado",
            "3 colheres de chocolate em pó",
            "1 colher de manteiga",
            "Chocolate granulado"
        ],
        preparation: "1. Misture tudo na panela\n2. Cozinhe até soltar do fundo\n3. Faça as bolinhas",
        videoUrl: "https://www.youtube.com/embed/watch?v=PfK5Y1JzW-U"
    },
    {
        id: 4,
        name: "Mousse de Maracujá",
        type: "doce",
        time: "20 min",
        portions: "6 porções",
        ingredients: [
            "1 lata de leite condensado",
            "1 lata de suco de maracujá",
            "1 lata de creme de leite"
        ],
        preparation: "1. Bata tudo no liquidificador\n2. Leve à geladeira",
        videoUrl: "https://www.youtube.com/embed/watch?v=jD1k-HWQtJo"
    },
    {
        id: 5,
        name: "Pavê de Chocolate",
        type: "doce",
        time: "40 min",
        portions: "8 porções",
        ingredients: [
            "1 pacote de bolacha maisena",
            "1 lata de leite condensado",
            "2 latas de leite",
            "2 colheres de amido de milho",
            "4 colheres de chocolate em pó"
        ],
        preparation: "1. Faça o creme\n2. Monte camadas\n3. Leve à geladeira",
        videoUrl: "https://www.youtube.com/embed/watch?v=TU5IJwGBv_Y"
    },
    // Continue com mais 5 receitas doces...

    // Receitas Salgadas
    {
        id: 11,
        name: "Pão de Queijo",
        type: "salgado",
        time: "30 min",
        portions: "20 unidades",
        ingredients: [
            "500g de polvilho azedo",
            "1 xícara de leite",
            "1/2 xícara de óleo",
            "2 ovos",
            "200g de queijo minas"
        ],
        preparation: "1. Escalde o polvilho\n2. Adicione os ingredientes\n3. Asse por 20 minutos",
        videoUrl: "https://www.youtube.com/embed/watch?v=y0PWZjhvpr4"
    },
    {
        id: 12,
        name: "Coxinha",
        type: "salgado",
        time: "90 min",
        portions: "15 unidades",
        ingredients: [
            "2 xícaras de farinha de trigo",
            "2 xícaras de caldo de galinha",
            "300g de frango desfiado",
            "1 cebola",
            "Temperos a gosto"
        ],
        preparation: "1. Faça a massa\n2. Prepare o recheio\n3. Modele e frite",
        videoUrl: "https://www.youtube.com/embed/watch?v=KFVZXyW7NsM"
    },
    {
        id: 13,
        name: "Lasanha",
        type: "salgado",
        time: "60 min",
        portions: "8 porções",
        ingredients: [
            "Massa de lasanha",
            "500g de carne moída",
            "Molho de tomate",
            "Queijo e presunto",
            "Molho branco"
        ],
        preparation: "1. Prepare os molhos\n2. Monte as camadas\n3. Asse por 45 minutos",
        videoUrl: "https://www.youtube.com/embed/watch?v=J_CvEM7FGXI"
    },
    {
        id: 14,
        name: "Quiche de Legumes",
        type: "salgado",
        time: "50 min",
        portions: "6 porções",
        ingredients: [
            "Massa de torta",
            "3 ovos",
            "200ml de creme de leite",
            "Legumes variados",
            "Queijo ralado"
        ],
        preparation: "1. Forre a forma com a massa\n2. Prepare o recheio\n3. Asse até dourar",
        videoUrl: "https://www.youtube.com/embed/watch?v=QK6jsQU4VU0"
    },
    {
        id: 15,
        name: "Bolinho de Arroz",
        type: "salgado",
        time: "40 min",
        portions: "20 unidades",
        ingredients: [
            "2 xícaras de arroz cozido",
            "2 ovos",
            "1/2 xícara de queijo ralado",
            "Salsinha",
            "Temperos a gosto"
        ],
        preparation: "1. Misture tudo\n2. Faça bolinhas\n3. Frite até dourar",
        videoUrl: "https://www.youtube.com/embed/watch?v=YG-nK_XzqQ8"
    }
    // Continue com mais 5 receitas salgadas...
];

// Função para carregar as receitas
function loadRecipes(filter = 'todos') {
    const recipesGrid = document.getElementById('recipesGrid');
    recipesGrid.innerHTML = '';

    const filteredRecipes = filter === 'todos' 
        ? recipes 
        : recipes.filter(recipe => recipe.type === filter);

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    filteredRecipes.forEach(recipe => {
        const isFavorite = favorites.includes(recipe.id);
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h2>${recipe.name}</h2>
            <div class="recipe-info">
                <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                <span><i class="fas fa-utensils"></i> ${recipe.portions}</span>
            </div>
            <div class="recipe-section">
                <h3><i class="fas fa-list"></i> Ingredientes</h3>
                <ul class="ingredients-list">
                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
            <div class="recipe-section">
                <h3><i class="fas fa-book"></i> Modo de Preparo</h3>
                <p class="preparation-steps">${recipe.preparation}</p>
            </div>
            <div class="video-wrapper">
                <iframe src="${recipe.videoUrl}" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="card-actions">
                <button class="btn-favorite ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${recipe.id}, this)">
                    <i class="fas fa-star"></i>
                    <span>${isFavorite ? 'Favoritado' : 'Favoritar'}</span>
                </button>
            </div>
        `;
        recipesGrid.appendChild(card);
    });
}

// Função para alternar favorito
function toggleFavorite(recipeId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(recipeId);
    
    if (index === -1) {
        favorites.push(recipeId);
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-star"></i><span>Favoritado</span>';
    } else {
        favorites.splice(index, 1);
        button.classList.remove('active');
        button.innerHTML = '<i class="fas fa-star"></i><span>Favoritar</span>';
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Event listeners para os botões de filtro
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadRecipes(button.dataset.filter);
        });
    });

    // Carrega todas as receitas inicialmente
    loadRecipes();
});
