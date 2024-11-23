document.addEventListener('DOMContentLoaded', function() {
    const recipesGrid = document.getElementById('recipes-grid');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Load favorites from localStorage
    let indexFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Define recipes array
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
            videoUrl: "https://www.youtube.com/embed/quhQP3T0YM4"
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
            videoUrl: "https://www.youtube.com/embed/GAxLcwSQW40"
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
            videoUrl: "https://www.youtube.com/embed/L8jHzp_noxY"
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
            videoUrl: "https://www.youtube.com/embed/itN5ZDEP-sc"
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
            videoUrl: "https://www.youtube.com/embed/bIUTU-ORjtY"
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
            videoUrl: "https://www.youtube.com/embed/OnY3Z6mqEhk"
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
            videoUrl: "https://www.youtube.com/embed/UMw29jjkd-s"
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
            videoUrl: "https://www.youtube.com/embed/wEO7w7StD3A"
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
            videoUrl: "https://www.youtube.com/embed/M64DXNFUbbg"
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
            videoUrl: "https://www.youtube.com/embed/945nkfyGAH4"
        },
        {
            id: 16,
            nome: "Risoto de Proteína e Vegetais",
            tipo: "salgado",
            tempoPreparo: "40",
            porcoes: "4 porções",
            ingredientes: [
                "04 colheres de sopa de manteiga",
                "1 xícara de arroz arbóreo",
                "½ xícara de cebola picada",
                "½ xícara de vinho branco seco",
                "06 xícaras de caldo de carne/legumes/peixe",
                "200 g da proteína da sua preferência",
                "150g de um vegetal da sua preferência (abobrinha, cogumelos, rúcula, etc)"
            ],
            preparo: "1. Refogue a cebola em 02 colheres de sopa de manteiga\n2. Adicione o arroz sem lavar e mexa para envolvê-lo bem\n3. Junte o vinho, mexendo constantemente até que seja totalmente absorvido e evapore completamente\n4. Coloque a proteína já refogada/salteada\n5. Inicie então a adição do caldo quente, uma concha de cada vez, mexendo sempre até o arroz absorver quase toda a quantidade de caldo\n6. Repita esse processo durante 16 a 18 minutos, devendo a mistura ficar cremosa e o arroz “al dente”\n7. Junte o vegetal (se for um vegetal de consistência mais firme, é possível colocar antes)\n8. Apague o fogo e acrescente as 02 colheres restantes de manteiga e 2 colheres de parmesão ralado, mexendo bem para dar cremosidade ao risotto, corrija o sal\n9. Sirva imediatamente",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 17,
            nome: "Tartare de Salmão",
            tipo: "salgado",
            tempoPreparo: "15",
            porcoes: "2 porções",
            ingredientes: [
                "200 g de salmão picado",
                "Suco de 1 limão",
                "2 pepinos ralados",
                "2 colheres de sopa de mostarda dijon",
                "50 g de amêndoas em lascas",
                "3 colheres de sopa de shoyo"
            ],
            preparo: "1. Misture todos os ingredientes, deixando as lascas de amêndoas para colocar somente no momento de servir.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 18,
            nome: "Bolo de Chocolate Cremoso",
            tipo: "doce",
            tempoPreparo: "40",
            porcoes: "12 porções",
            ingredientes: [
                "200g de manteiga sem sal",
                "200g de chocolate amargo",
                "1 xícara de chá de açúcar de confeiteiro",
                "5 ovos",
                "1/3 xícara de chá de amido de milho"
            ],
            preparo: "1. Pré-aqueça o forno a 180ºC (temperatura média). Unte com manteiga uma assadeira redonda de 24 centímetros de diâmetro com fundo removível.\n2. Derreta a manteiga com o chocolate em banho-maria.\n3. Retire a tigela do banho-maria. Acrescente o açúcar e misture delicadamente com uma espátula.\n4. Com um garfo misture as gemas com as claras, sem bater. Em seguida, junte os ovos à massa de chocolate. Misture delicadamente com a espátula, com cuidado para não formar bolhas: esse é o segredo para o bolo ficar denso e bem cremoso.\n5. Por último, peneire o amido sobre a massa e misture até ela ficar lisa. Transfira para a forma preparada e leve ao forno preaquecido.\n6. Deixe assar por 20 minutos: o interior deve ficar úmido e sai do forno com cara de que ainda não está todo assado. Deixe esfriar por 20 minutos, cubra com filme e leve à geladeira por uma hora para firmar antes de servir.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 19,
            nome: "Arroz de Aletria - Árabe",
            tipo: "salgado",
            tempoPreparo: "30",
            porcoes: "4 porções",
            ingredientes: [
                "2 xícaras de chá de arroz branco lavado e escorrido",
                "1 ninho de macarrão cabelo de anjo",
                "2 dentes de alho picado",
                "1 colher de sopa de óleo de soja",
                "4 xícaras de água quente",
                "sal a gosto"
            ],
            preparo: "1. Refogue o alho picado em fogo baixo.\n2. Aumente o fogo e quebre o ninho de macarrão dentro da panela. Deixe refogar e ficar bem douradinho.\n3. Acrescente o arroz e aumente o fogo sem parar de mexer.\n4. Coloque a água, mexa e em seguida o sal. Misture bem.\n5. Tampe e deixe ferver.\n6. Assim que ferver, destampe a panela (pela metade) e abaixe o fogo.\n7. Acompanhe e assim que acabar a água desligue.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 20,
            nome: "Strogonoff de Carne",
            tipo: "salgado",
            tempoPreparo: "40",
            porcoes: "4 porções",
            ingredientes: [
                "1 kg de carne macia (filet migon)",
                "4 colheres de sopa de manteiga",
                "1 cebola picada",
                "sal a gosto",
                "½ xícara de conhaque",
                "200g cogumelos picados",
                "3 tomates sem pele e sem sementes picados",
                "1 colher de sopa de mostarda",
                "2 colheres de sopa de ket chup",
                "1 lata de creme de leite"
            ],
            preparo: "1. Corte a carne em tirinhas finas e frite em 3 colheres de manteiga, sem deixar juntar suco.\n2. Retire a carne, coloque mais uma colher de manteiga e frite a cebola.\n3. Junte novamente a carne, despeje o conhaque e incline levemente a panela para que o conhaque incendeie dentro da panela.\n4. Deixe flambar, e para apagar tampe. Junte os cogumelos e os tomates tampe e deixe 5 minutos.\n5. Coloque a mostarda e o ket chup, mexa bem e retire deixando no fogo baixo.\n6. Coloque o creme de leite e desligue o fogo antes de ferver. Sirva com arroz branco e batata palha.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 21,
            nome: "Escondidinho de Carne Seca",
            tipo: "salgado",
            tempoPreparo: "60",
            porcoes: "6 porções",
            ingredientes: [
                "500g de carne seca",
                "1 cebola",
                "2 colheres de sopa de alho picado",
                "600g de mandioca",
                "1 copo de leite",
                "2 colheres de manteiga sem sal",
                "Noz moscada ralada",
                "Queijo parmesão ralado a gosto",
                "Sal a gosto"
            ],
            preparo: "1. Descasque a mandioca. Deixe cozinhar até ficarem bem macias.\n2. Depois de cozidas, dispense a água. Amasse bem as mandiocas.\n3. Coloque a mandioca numa panela, em fogo baixo.\n4. Acrescente a manteiga e não pare de mexer.\n5. Vá colocando o leite aos poucos. Defina a textura de acordo com a quantidade de leite.\n6. Rale aproximadamente 1 colher de café de noz moscada.\n7. Acrescente o queijo e o sal.\n8. Ferva a carne seca em água para retirar o sal. Troque a água e repita o processo.\n9. Cozinhe a carne seca por 20 minutos em panela de pressão.\n10. Depois de fria, desfie a carne seca.\n11. Refogue a cebola e o alho em fogo baixo.\n12. Em seguida, acrescente a carne. Aumente o fogo.\n13. Monte o prato em uma forma, colocando a carne refogada por baixo e cobrindo com a mandioca. Leve ao forno para dourar.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 22,
            nome: "Bolo de Fubá Cremoso",
            tipo: "doce",
            tempoPreparo: "40",
            porcoes: "12 porções",
            ingredientes: [
                "4 ovos inteiros",
                "4 xícaras de leite",
                "1 xícara de fubá",
                "3 xícaras de açúcar",
                "1 colher de sopa de fermento químico",
                "2 colheres de sopa de manteiga",
                "1 pires de parmesão ralado",
                "3 colheres de sopa de farinha de trigo"
            ],
            preparo: "1. Bater tudo no liquidificador.\n2. Acrescente o fermento ao final e bata novamente.\n3. Colocar em uma forma de vidro retangular, untada com manteiga e farinha de trigo.\n4. Forno a 180°C.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 23,
            nome: "Feijão Carioca",
            tipo: "salgado",
            tempoPreparo: "50",
            porcoes: "6 porções",
            ingredientes: [
                "1 cebola grande picada em pedaços pequenos",
                "2 dentes de alho picado",
                "3 colheres de sopa de óleo de soja",
                "200g de bacon picado",
                "1 kg de feijão carioca",
                "2 tabletes de caldo de carne",
                "2 folhas de louro",
                "sal a gosto",
                "1,5 l de água"
            ],
            preparo: "1. Lave o feijão e escorra a água.\n2. Em uma panela de pressão, refogue a cebola e o alho no óleo, em fogo baixo.\n3. Antes de dourar, coloque o bacon e frite.\n4. Acrescente o feijão. Mexa bem com uma colher de pau.\n5. Coloque toda a água, o tabletes de caldo de carne, e as folhas de louro.\n6. Feche bem a panela, aumente o fogo e deixe cozinhar por 40 minutos após pegar pressão.\n7. Desligue e retire a pressão para abrir a panela.\n8. Com cuidado abra a panela, e volte a panela para o fogo alto para engrossar um pouco o caldo.\n9. Acerte o sal.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 24,
            nome: "Arroz Branco",
            tipo: "salgado",
            tempoPreparo: "20",
            porcoes: "4 porções",
            ingredientes: [
                "2 xícaras de chá de arroz branco lavado e escorrido",
                "2 dentes de alho picado",
                "1 colher de sopa de óleo de soja",
                "4 xícaras de água quente",
                "sal a gosto"
            ],
            preparo: "1. Refogue o alho picado em fogo baixo.\n2. Acrescente o arroz e aumente o fogo sem parar de mexer.\n3. Coloque a água, mexa e em seguida o sal. Misture bem.\n4. Tampe e deixe ferver.\n5. Assim que ferver, destampe a panela (pela metade) e abaixe o fogo.\n6. Acompanhe e assim que acabar a água desligue.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 25,
            nome: "Bife à Milanesa",
            tipo: "salgado",
            tempoPreparo: "30",
            porcoes: "4 porções",
            ingredientes: [
                "4 bifes de uma carne magra e macia (filet mignon, contra-filet, alcatra)",
                "Sal a gosto",
                "Pimenta do reino em pó a gosto",
                "Farinha de trigo",
                "1 ovo",
                "Farinha de Rosca",
                "Óleo de soja para fritar"
            ],
            preparo: "1. Tempere os bifes com sal e pimenta.\n2. Passe os bifes na farinha de trigo. Aperte bem para grudar a farinha.\n3. Em seguida, passe os bifes no ovo já batido.\n4. Por fim, passe os bifes na farinha de rosca, apertando bem para incorporar.\n5. Frite os bifes em óleo bem quente.\n6. Deixe-os escorrer em um papel toalha.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 26,
            nome: "Purê de Batatas",
            tipo: "salgado",
            tempoPreparo: "40",
            porcoes: "4 porções",
            ingredientes: [
                "4 batatas grandes",
                "Aprox. 1 copo de creme de leite fresco",
                "2 colheres de manteiga sem sal",
                "Noz moscada ralada",
                "Sal a gosto"
            ],
            preparo: "1. Descasque as batatas. Deixe cozinhar até ficarem bem macias.\n2. Depois de cozidas, dispense a água. Amasse bem as batatas.\n3. Coloque as batatas numa panela, em fogo baixo.\n4. Acrescente a manteiga e não pare de mexer.\n5. Vá colocando o creme de leite aos poucos. Defina a textura de acordo com a quantidade de creme de leite.\n6. Rale aproximadamente 1 colher de café de noz moscada.\n7. Acrescente sal.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 27,
            nome: "Brigadeiro",
            tipo: "doce",
            tempoPreparo: "15",
            porcoes: "10 porções",
            ingredientes: [
                "1 lata de leite condensado",
                "1 colher de sopa de margarina sem sal",
                "4 colheres de sopa de chocolate em pó (chocolate do padre) ou 7 colheres de achocolatado (Nescau)"
            ],
            preparo: "1. Acenda o fogo médio e em uma panela pequena coloque todos os ingredientes. Não pare de mexer com a colher de pau. Cozinhe até “desgrudar” do fundo da panela.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 28,
            nome: "Massa com Molho de Tomates",
            tipo: "salgado",
            tempoPreparo: "30",
            porcoes: "4 porções",
            ingredientes: [
                "250 gramas de massa seca de grano duro (espaguete, bucattini, linguine, fetuccine, penne e etc...)",
                "Água",
                "Sal",
                "1/2 Kg de tomate bem maduro (Débora ou Italiano) sem casca e sementes",
                "1/2 cebola picada",
                "01 dente de alho amassado",
                "03 colheres de sopa de óleo de canola",
                "Folhas de manjericão",
                "Sal a gosto"
            ],
            preparo: "1. Ferva a água com sal.\n2. Cozinhe a massa até ficar al dente.\n3. Retire a pele e as sementes dos tomates. Corte-os em pedaços pequenos.\n4. Refogue a cebola e o alho no óleo.\n5. Acrescente os tomates. Misture bem, tampe e deixe o tomate cozinhar. Eles devem ficar macios, mas não desmancharem. Se precisar, acrescente um pouco de água.\n6. Coloque o sal.\n7. Acrescente as folhas de manjericão e tampe por alguns minutos.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 29,
            nome: "Panquecas",
            tipo: "salgado",
            tempoPreparo: "45",
            porcoes: "4 porções",
            "ingredientes": [
                "1 ovo",
                "1 copo de leite",
                "1 copo de farinha de trigo",
                "1 pitada de sal",
                "400 gramas de carne moída (acem)",
                "1 cebola picada",
                "1 dente de alho picado",
                "1 colher de sopa de óleo de soja",
                "½ tablete de caldo de carne",
                "Azeitonas picadas sem caroço",
                "Salsinha picada"
            ],
            preparo: "1. Bata todos os ingredientes do liquidificador.\n2. Em uma frigideira de teflon, aquece um fio de óleo. Quando o óleo estiver bem quente, seque a frigideira com um papel toalha.\n3. Derrame na frigideira, uma concha da massa líquida. Ela irá assar aos poucos.\n4. Comece soltando os cantos da massa com uma colher. Quando a massa estiver completamente solta, vire-a.\n5. Em uma panela alta, refogue a cebola, e o alho. Quando estiver “suada”, coloque a carne moída. Mexa até que os gominhos de carne se soltem uns dos outros.\n6. Acrescente o caldo de carne.\n7. Coloque as azeitonas.\n8. Corrija o sal.\n9. Por fim, coloque a salsinha, mexa bem e desligue.\n10. Enrole as panquecas com o recheio. Regue com molho em uma assadeira e leve ao forno.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 30,
            nome: "Peito de Frango",
            tipo: "salgado",
            tempoPreparo: "20",
            porcoes: "2 porções",
            ingredientes: [
                "1 peito de frango desossado e sem pele",
                "Alho picado",
                "Vinagre branco",
                "Caldo de galinha",
                "Sal"
            ],
            preparo: "1. Limpe o peito conforme demonstrado em aula.\n2. Tempere utilizando as mãos.\n3. Em uma frigideira com apenas um fio de óleo de soja, grelhe os filets.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 31,
            nome: "Bolo de Limão",
            tipo: "doce",
            tempoPreparo: "60",
            porcoes: "8 porções",
            ingredientes: [
                "3 ovos",
                "½ xícara de óleo",
                "2 xícaras de açúcar",
                "½ xícara de leite",
                "½ xícara de suco de limão",
                "Raspas de 1 limão",
                "1 colher (sopa) de fermento em pó",
                "2 xícaras de farinha de trigo"
            ],
            preparo: "1. Pré-aqueça o forno a 250°.\n2. Unte e enfarinhe uma forma redonda com furo no centro.\n3. Coloque todos os ingredientes no liquidificador, menos o fermento.\n4. Bata até misturar bem.\n5. Adicione o fermento e pulse apenas para misturar.\n6. Coloque na forma e asse até dourar.\n7. Desenforme de morno a frio.\n8. Para fazer uma cobertura/recheio, misture ½ lata de leite condensado com o suco de 2 limões. Faça furos no bolo depois de pronto e derrame o recheio.",
            videoUrl: "https://www.youtube.com/embed/watch?v=example"
        },
        {
            id: 32,
            nome: "Sacolé de Pudim",
            tipo: "doce",
            tempoPreparo: "60",
            porcoes: "8 porções",
            ingredientes: [
                "1 lata de leite condensado",
                "2 xícaras de leite",
                "3 gemas de ovo",
                "1 colher de sopa de amido de milho (maizena)",
                "1 colher de chá de essência de baunilha",
                "1 pacote de gelatina sem sabor (12g)",
                "1 xícara de leite integral (para dissolver a gelatina)",
                "½ xícara de açúcar"
            ],
            preparo: "1. Em uma panela, misture o leite condensado, o leite e as gemas.\n2. Leve ao fogo médio, mexendo sempre até começar a engrossar. Não deixe ferver, apenas espere engrossar um pouco.\n3. Dissolva a colher de amido de milho em um pouco de leite e adicione à mistura, mexendo até o creme ficar mais espesso. Retire do fogo.\n4. Dissolva a gelatina sem sabor no leite morno e misture bem até não restar nenhum grumo. Deixe esfriar um pouco.\n5. Misture a gelatina dissolvida ao creme de pudim já morno.\n6. Adicione a essência de baunilha e o açúcar, mexendo até tudo se incorporar bem.\n7. Despeje o creme nas forminhas de sacolé, preenchendo até o topo.\n8. Feche bem as forminhas e leve ao congelador por cerca de 6 horas ou até que estejam completamente congelados.",
            videoUrl: "https://www.tiktok.com/@mgdelicias._/video/7292587041542425862?_r=1&_t=8rdlfZr31N9"
        },
        {
            id: 33,
            nome: "Bolo de microondas",
            tipo: "doce",
            tempoPreparo: "10",
            porcoes: "1 porções",
            ingredientes: [
                "1 ovo",
                "4 colheres sopa de farinha de trigo",
                "2 colheres sopa de toddy",
                "1 colheres sopa de açucar",
                "4 colheres sopa de leite",
                "1 colheres  sopa de oleo",
                "1 colheres chá de fermento",
            ],
            preparo: "mistura tudo e leva no microondas por 2 a 3 minutos.",
            videoUrl: "https://www.tiktok.com/@caarlosamaral/video/6955454192219655429?_r=1&_t=8rdlkaZHXV9"
        }
    ];



    // Function to render recipes
    function renderRecipes(filteredRecipes = recipes) {
        recipesGrid.innerHTML = '';
        
        if (filteredRecipes.length === 0) {
            recipesGrid.innerHTML = `
                <div class="recipe-card">
                    <h2>Nenhuma receita encontrada</h2>
                    <p>Não há receitas correspondentes aos critérios de busca.</p>
                </div>
            `;
            return;
        }
        
        filteredRecipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            
            const isFavorite = indexFavorites.includes(recipe.id);
            
            // Format ingredients as list if it's an array
            const ingredientsList = Array.isArray(recipe.ingredientes) 
                ? recipe.ingredientes.map(ing => `<li>${ing}</li>`).join('')
                : recipe.ingredientes.split('\n').map(ing => `<li>${ing}</li>`).join('');
            
            const isVideoTikTok = recipe.videoUrl && recipe.videoUrl.includes('tiktok.com');
            
            const videoHtml = recipe.videoUrl ? (
                isVideoTikTok ? 
                `<a href="${recipe.videoUrl}" target="_blank" class="tiktok-link">
                    <i class="fab fa-tiktok"></i> Ver vídeo no TikTok
                </a>` :
                `<iframe 
                    src="${recipe.videoUrl}" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>`
            ) : '';

            card.innerHTML = `
                <h2>${recipe.nome}</h2>
                <div class="recipe-info">
                    <span><i class="fas fa-clock"></i> ${recipe.tempoPreparo} min</span>
                    <span><i class="fas fa-utensils"></i> ${recipe.porcoes}</span>
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
                ${videoHtml}
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
    
    // Function to filter recipes
    function filterRecipes() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        
        const filteredRecipes = recipes.filter(recipe => {
            const matchesSearch = recipe.nome.toLowerCase().includes(searchTerm);
            const matchesFilter = activeFilter === 'todos' || recipe.tipo === activeFilter;
            return matchesSearch && matchesFilter;
        });
        
        renderRecipes(filteredRecipes);
    }
    
    // Function to toggle favorite
    window.toggleFavorite = function(recipeId, button) {
        const index = indexFavorites.indexOf(recipeId);
        
        if (index === -1) {
            indexFavorites.push(recipeId);
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-star"></i><span>Favoritado</span>';
        } else {
            indexFavorites.splice(index, 1);
            button.classList.remove('active');
            button.innerHTML = '<i class="fas fa-star"></i><span>Favoritar</span>';
        }
        
        localStorage.setItem('favorites', JSON.stringify(indexFavorites));
    };
    
    // Event listeners
    searchInput.addEventListener('input', filterRecipes);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterRecipes();
        });
    });
    
    // Initial render
    renderRecipes();
});
