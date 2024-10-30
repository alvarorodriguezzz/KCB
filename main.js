// relative time
class RelativeTime extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
        setInterval(() => this.render(), 1000);
    }
    static get observedAttributes() {
        return ['time'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }
    render() {
        const timeValue = this.getAttribute('time');
        const time = timeValue ? new Date(timeValue).getTime() : Date.now();
        const now = Date.now();
        const diff = now - time;
        const seconds = Math.floor(diff / 1000) || 1;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        let aux = '...';
        if (years >= 1) {
            aux = `Hace ${years} año${years > 1 ? 's' : ''}`;
        } else if (months >= 1) {
            aux = `Hace ${months} mes${months > 1 ? 'es' : ''}`;
        } else if (days >= 1) {
            aux = `Hace ${days} día${days > 1 ? 's' : ''}`;
        } else if (hours >= 1) {
            aux = `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
        } else if (minutes >= 1) {
            aux = `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
        } else {
            aux = `Hace ${seconds} segundo${seconds > 1 ? 's' : ''}`;
        }
        this.textContent = aux;
    }
}
customElements.define('relative-time', RelativeTime);

// las noticias
const articles = [
    {
      "id": 1,
      "image": "https://cdn.kqed.org/wp-content/uploads/sites/35/2024/10/GettyImages-1347890261-1020x680.jpg",
      "title": "Climate Activists Push for Carbon Tax With Measure GG, But Critics Warn it Could Backfire",
      "description": "Grassroots climate activists argue a tax on gas use in large buildings will help all of Berkeley kick fossil fuels. But many politicians, businesses, and nonprofits, even those that work on climate, don’t think Measure GG is the policy to get there.",
      "date": "2023-10-17T11:00:16Z",
      "category": "Climate"
    },
    {
      "id": 2,
      "image": "https://fortune.com/img-assets/wp-content/uploads/2024/10/GettyImages-2170862982_413c33-e1729160290535.jpg?resize=1200,600",
      "title": "Musk’s empire risks being targeted by EU for potential X fines",
      "description": "The EU may target Elon Musk’s broader business empire for X fines, potentially including revenue from SpaceX and Neuralink to increase penalties.",
      "date": "2024-09-17T10:32:45Z",
      "category": "Business"
    },
    {
      "id": 3,
      "image": "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729160267/autoexpress/2024/10/Omode E5 first UK drive.jpg",
      "title": "Omoda E5 in Noble trim - pictures",
      "description": "Pictures of the electric Omode E5 SUV being driven on UK roads. Pictures taken by Auto Express senior photographer Pete Gibson",
      "date": "2024-10-15T10:30:56Z",
      "category": "Automobile"
    },
    {
      "id": 4,
      "image": "https://cdn.mos.cms.futurecdn.net/6xqynicLzH6sSskfiNyWoT-1200-80.jpg",
      "title": "Renault, Alpine and Citroën help the 2024 Paris Motor Show return to form",
      "description": "Explore the most delectable debuts at the Paris Motor Show 2024 – or Mondial de l'Auto – including designs from France's big car makers and niche machines from around the world",
      "date": "2024-10-13T10:25:24Z",
      "category": "Automobile"
    },
    {
      "id": 5,
      "image": "https://www.computerworld.com/wp-content/uploads/2024/10/3567767-0-90640600-1729160617-IDG-Germany-Intel-September-News.jpg?quality=50&strip=all&w=1024",
      "title": "Chinese cybersecurity association urges review of Intel products",
      "description": "The Cybersecurity Association of China (CSAC) has urged a security review of Intel products sold in the country, claiming the US semiconductor firm poses ongoing threats to China’s national security and interests.",
      "date": "2024-10-01T10:22:56Z",
      "category": "Business"
    },
    {
      "id": 6,
      "image": "https://cdn.kqed.org/wp-content/uploads/sites/35/2024/10/GettyImages-1347890261-1020x680.jpg",
      "title": "Climate Activists Push for Carbon Tax With Measure GG, But Critics Warn it Could Backfire",
      "description": "Grassroots climate activists argue a tax on gas use in large buildings will help all of Berkeley kick fossil fuels. But many politicians, businesses, and nonprofits, even those that work on climate, don’t think Measure GG is the policy to get there.",
      "date": "2023-10-17T11:00:16Z",
      "category": "Climate"
    },
    {
      "id": 7,
      "image": "https://fortune.com/img-assets/wp-content/uploads/2024/10/GettyImages-2170862982_413c33-e1729160290535.jpg?resize=1200,600",
      "title": "Musk’s empire risks being targeted by EU for potential X fines",
      "description": "The EU may target Elon Musk’s broader business empire for X fines, potentially including revenue from SpaceX and Neuralink to increase penalties.",
      "date": "2024-09-17T10:32:45Z",
      "category": "Business"
    },
    {
      "id": 8,
      "image": "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729160267/autoexpress/2024/10/Omode E5 first UK drive.jpg",
      "title": "Omoda E5 in Noble trim - pictures",
      "description": "Pictures of the electric Omode E5 SUV being driven on UK roads. Pictures taken by Auto Express senior photographer Pete Gibson",
      "date": "2024-10-15T10:30:56Z",
      "category": "Automobile"
    },
    {
      "id": 9,
      "image": "https://cdn.mos.cms.futurecdn.net/6xqynicLzH6sSskfiNyWoT-1200-80.jpg",
      "title": "Renault, Alpine and Citroën help the 2024 Paris Motor Show return to form",
      "description": "Explore the most delectable debuts at the Paris Motor Show 2024 – or Mondial de l'Auto – including designs from France's big car makers and niche machines from around the world",
      "date": "2024-10-13T10:25:24Z",
      "category": "Automobile"
    },
    {
      "id": 10,
      "image": "https://www.computerworld.com/wp-content/uploads/2024/10/3567767-0-90640600-1729160617-IDG-Germany-Intel-September-News.jpg?quality=50&strip=all&w=1024",
      "title": "Chinese cybersecurity association urges review of Intel products",
      "description": "The Cybersecurity Association of China (CSAC) has urged a security review of Intel products sold in the country, claiming the US semiconductor firm poses ongoing threats to China’s national security and interests.",
      "date": "2024-10-01T10:22:56Z",
      "category": "Business"
    },
    {
      "id": 11,
      "image": "https://cdn.kqed.org/wp-content/uploads/sites/35/2024/10/GettyImages-1347890261-1020x680.jpg",
      "title": "Climate Activists Push for Carbon Tax With Measure GG, But Critics Warn it Could Backfire",
      "description": "Grassroots climate activists argue a tax on gas use in large buildings will help all of Berkeley kick fossil fuels. But many politicians, businesses, and nonprofits, even those that work on climate, don’t think Measure GG is the policy to get there.",
      "date": "2023-10-17T11:00:16Z",
      "category": "Climate"
    },
    {
      "id": 12,
      "image": "https://fortune.com/img-assets/wp-content/uploads/2024/10/GettyImages-2170862982_413c33-e1729160290535.jpg?resize=1200,600",
      "title": "Musk’s empire risks being targeted by EU for potential X fines",
      "description": "The EU may target Elon Musk’s broader business empire for X fines, potentially including revenue from SpaceX and Neuralink to increase penalties.",
      "date": "2024-09-17T10:32:45Z",
      "category": "Business"
    },
    {
      "id": 13,
      "image": "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729160267/autoexpress/2024/10/Omode E5 first UK drive.jpg",
      "title": "Omoda E5 in Noble trim - pictures",
      "description": "Pictures of the electric Omode E5 SUV being driven on UK roads. Pictures taken by Auto Express senior photographer Pete Gibson",
      "date": "2024-10-15T10:30:56Z",
      "category": "Automobile"
    },
    {
      "id": 14,
      "image": "https://cdn.mos.cms.futurecdn.net/6xqynicLzH6sSskfiNyWoT-1200-80.jpg",
      "title": "Renault, Alpine and Citroën help the 2024 Paris Motor Show return to form",
      "description": "Explore the most delectable debuts at the Paris Motor Show 2024 – or Mondial de l'Auto – including designs from France's big car makers and niche machines from around the world",
      "date": "2024-10-13T10:25:24Z",
      "category": "Automobile"
    },
    {
      "id": 15,
      "image": "https://www.computerworld.com/wp-content/uploads/2024/10/3567767-0-90640600-1729160617-IDG-Germany-Intel-September-News.jpg?quality=50&strip=all&w=1024",
      "title": "Chinese cybersecurity association urges review of Intel products",
      "description": "The Cybersecurity Association of China (CSAC) has urged a security review of Intel products sold in the country, claiming the US semiconductor firm poses ongoing threats to China’s national security and interests.",
      "date": "2024-10-01T10:22:56Z",
      "category": "Bunisses"
    },
    {
        "id": 16,
        "image": href="img/trunks ese.jfif",
        "title": "Biden Seeks to Reassure Voters Amidst Economic Concerns",
        "description": "President Biden addresses economic concerns as he campaigns for a second term, emphasizing job growth and inflation control.",
        "date": "2024-10-26T08:15:00Z",
        "category": "US Election"
      },
      {
        "id": 17,
        "image": href="img/trunks ese.jfif",
        "title": "Trump Holds Rally in Florida, Focuses on Immigration and Economy",
        "description": "Former President Donald Trump held a massive rally in Florida, promising to secure the border and revitalize the economy.",
        "date": "2024-10-25T12:30:00Z",
        "category": "US Election"
      },
      {
        "id": 18,
        "image": href="img/harris2.jfif",
        "title": "Kamala Harris Appeals to Young Voters in Key Swing States",
        "description": "Vice President Harris targets young voters with promises of student debt relief and climate action in swing states.",
        "date": "2024-10-24T14:00:00Z",
        "category": "US Election"
      },
      {
        "id": 19,
        "image": href="img/harris.jfif",
        "title": "Presidential Debate Highlights Key Issues on Foreign Policy and Healthcare",
        "description": "Candidates sparred over foreign policy and healthcare reform in a heated debate, drawing sharp contrasts between their platforms.",
        "date": "2024-10-23T20:00:00Z",
        "category": "US Election"
      },
      {
        "id": 22,
        "image": href="img/map.jfif",
        "title": "Swing States Become Battlegrounds in Final Weeks of Campaign",
        "description": "Candidates intensify efforts in swing states as the race tightens, with both sides looking to secure crucial electoral votes.",
        "date": "2024-10-20T15:30:00Z",
        "category": "US Election"
      },
      {
        "id": 24,
        "image": href="img/bidel i truns.jfif",
        "title": "Latest Polls Show Tight Race Between Biden and Trump",
        "description": "A recent poll shows the race between Biden and Trump narrowing, with key issues like healthcare and the economy in focus.",
        "date": "2024-10-18T08:00:00Z",
        "category": "US Election"
      },
      {
        "id": 35,
        "image": "img/final_soccer.jfif",
        "title": "Dramática Final de la Copa Europea con Gol de Último Minuto",
        "description": "El equipo de Barcelona se coronó campeón tras un gol en los últimos segundos, en un partido que mantuvo a los fanáticos al borde de sus asientos.",
        "date": "2024-10-29T20:45:00Z",
        "category": "sports"
      },
      {
        "id": 36,
        "image": "img/maraton.jfif",
        "title": "Corredora Keniana Rompe Récord Mundial en la Maratón de Nueva York",
        "description": "Con un tiempo impresionante, la corredora keniana superó el récord mundial, llevando la carrera a otro nivel de exigencia y resistencia.",
        "date": "2024-10-28T09:00:00Z",
        "category": "sports"
      },
      {
        "id": 37,
        "image": "img/nba.jfif",
        "title": "Estrella de la NBA Regresa a las Canchas Tras Lesión de Rodilla",
        "description": "La figura de los Lakers, recuperada de su lesión, volvió con una actuación estelar, anotando 35 puntos en su primer partido de la temporada.",
        "date": "2024-10-27T18:30:00Z",
        "category": "sports"
      },
      {
        "id": 38,
        "image": "img/tennis_final.jfif",
        "title": "Histórico: Jugadora de 17 Años Gana su Primer Grand Slam en Wimbledon",
        "description": "La joven promesa del tenis internacional venció a la favorita en una final de Wimbledon inolvidable, convirtiéndose en la campeona más joven en décadas.",
        "date": "2024-10-26T16:00:00Z",
        "category": "sports"
      },
      {
        "id": 39,
        "image": "img/formula1.jfif",
        "title": "Piloto Mexicano Gana el Gran Premio de Mónaco en la Fórmula 1",
        "description": "El piloto sorprendió al mundo al conseguir su primera victoria en Mónaco, en una carrera llena de giros inesperados y adelantamientos.",
        "date": "2024-10-25T13:45:00Z",
        "category": "sports"
      },
      {
        "id": 40,
        "image": "img/art_festival.jfif",
        "title": "Festival Internacional de Arte Callejero Deslumbra en Berlín",
        "description": "Artistas de más de 20 países se reunieron en Berlín para transformar las calles en una galería de arte a cielo abierto, explorando temas de diversidad y cambio climático.",
        "date": "2024-10-28T17:00:00Z",
        "category": "Culture"
      },
      {
        "id": 41,
        "image": "img/film_awards.jfif",
        "title": "Película Independiente Gana Gran Premio en el Festival de Cannes",
        "description": "Un film experimental que explora la vida en comunidades rurales sorprendió al jurado y se llevó el premio mayor en Cannes, consolidando su lugar en el cine contemporáneo.",
        "date": "2024-10-27T21:30:00Z",
        "category": "Culture"
      },
      {
        "id": 42,
        "image": "img/poetry_slam.jfif",
        "title": "Poetry Slam Internacional Promueve el Activismo Social en México",
        "description": "Poetas de todo el mundo se reunieron en Ciudad de México para recitar versos sobre justicia social y derechos humanos, en un evento que capturó la atención de miles.",
        "date": "2024-10-26T19:00:00Z",
        "category": "Culture"
      },
      {
        "id": 43,
        "image": "img/ballet.jfif",
        "title": "Nueva Versión de El Lago de los Cisnes Revoluciona el Ballet Clásico",
        "description": "Una compañía de danza moderna presentó una adaptación innovadora de El Lago de los Cisnes, combinando elementos tecnológicos y contemporáneos en una puesta en escena única.",
        "date": "2024-10-25T20:00:00Z",
        "category": "Culture"
      },
      {
        "id": 44,
        "image": "img/museum_exhibit.jfif",
        "title": "Exposición de Arte Digital Atrae Multitudes en Tokio",
        "description": "La nueva exposición en Tokio combina realidad aumentada y arte digital, permitiendo a los visitantes interactuar directamente con las obras, lo que ha atraído a miles de curiosos.",
        "date": "2024-10-24T11:00:00Z",
        "category": "Culture"
      },
      {
        "id": 45,
        "image": "img/ai_research.jfif",
        "title": "Investigadores Desarrollan IA Capaz de Predecir Terremotos",
        "description": "Un equipo de científicos ha creado un sistema de inteligencia artificial que analiza patrones sísmicos para predecir terremotos con una precisión nunca antes vista.",
        "date": "2024-10-29T10:00:00Z",
        "category": "Innovation"
      },
      {
        "id": 46,
        "image": "img/vr_classroom.jfif",
        "title": "Escuelas Implementan Realidad Virtual para Clases de Historia",
        "description": "Un innovador programa de educación en realidad virtual permite a estudiantes experimentar momentos históricos de forma inmersiva, revolucionando la forma de aprender historia.",
        "date": "2024-10-28T13:30:00Z",
        "category": "Innovation"
      },
      {
        "id": 47,
        "image": "img/biodegradable_plastic.jfif",
        "title": "Científicos Crean Plástico Biodegradable que se Disuelve en Agua",
        "description": "Este nuevo material biodegradable promete reducir la contaminación plástica, ya que puede disolverse en agua sin dañar el medio ambiente.",
        "date": "2024-10-27T08:00:00Z",
        "category": "Innovation"
      },
      {
        "id": 48,
        "image": "img/3dprinted_houses.jfif",
        "title": "Casas Impresas en 3D Ofrecen Solución a la Crisis de Vivienda",
        "description": "Una empresa de tecnología ha construido un barrio entero de casas impresas en 3D en menos de un mes, ofreciendo una solución económica y rápida a la falta de vivienda.",
        "date": "2024-10-26T15:00:00Z",
        "category": "Innovation"
      },
      {
        "id": 49,
        "image": "img/quantum_computer.jfif",
        "title": "Computadora Cuántica Logra Romper un Récord de Velocidad en Cálculos",
        "description": "El avance en la computación cuántica ha permitido resolver problemas matemáticos complejos en segundos, marcando un hito en la tecnología de la información.",
        "date": "2024-10-25T09:00:00Z",
        "category": "Innovation"
      },
      {
        "id": 50,
        "image": "img/hologram_meeting.jfif",
        "title": "Reuniones Holográficas se Vuelven Comunes en Empresas Globales",
        "description": "Las reuniones holográficas permiten la interacción en 3D en tiempo real, revolucionando la comunicación en empresas con equipos distribuidos por todo el mundo.",
        "date": "2024-10-24T18:00:00Z",
        "category": "Innovation"
      }
  ]

// Definición de <custom-search>
class CustomSearch extends HTMLElement {
    constructor() {
        super();
        this.articles = articles;
    }

    connectedCallback() {
        const dialogBtn = this.querySelector('.dialog-search');
        const closeBtn = this.querySelector('.close-btn');
        const dialog = this.querySelector('dialog');
        dialogBtn.addEventListener('click', () => dialog.showModal());
        closeBtn.addEventListener('click', () => dialog.close());
        const siteSearch = this.querySelector('#site-search');
        siteSearch.addEventListener('input', (event) => this.search(event));
        this.renderResults('');
    }

    search(event) {
        event.preventDefault();
        const term = event.target.value;
        this.renderResults(term);
    }

    renderResults(term = '') {
        const searchResults = this.querySelector('#search-results');
        searchResults.innerHTML = '';
        const filteredArticles = this.articles
            .filter(article => article.title.toLowerCase().includes(term.toLowerCase()));

        const template = this.querySelector('template').content;
        filteredArticles.forEach(article => {
            const li = template.querySelector('li').cloneNode(true);
            li.querySelector('.card .item-image').src = article.image;
            li.querySelector('.card .item-description').textContent = article.description;
            li.querySelector('relative-time').setAttribute('time', article.date);
            const titleLink = li.querySelector('.card .item-title a');
            titleLink.textContent = article.title;
            titleLink.href = `article.html?id=${article.id}`;
            searchResults.appendChild(li);
        });
    }
}
customElements.define('custom-search', CustomSearch);

// Definición de <custom-article>
class CustomArticle extends HTMLElement {
    constructor() {
        super();
        this.articleId = new URLSearchParams(window.location.search).get('id');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const article = articles.find(article => article.id == this.articleId);
        if (article) {
            this.querySelector('h1').textContent = article.title;
            this.querySelector('p').textContent = article.description;
            this.querySelector('img').src = article.image;
            this.querySelector('relative-time').setAttribute('time', article.date);
        } else {
            this.innerHTML = '<p>Artículo no encontrado</p>';
        }
    }
}
customElements.define('custom-article', CustomArticle);



// Función para renderizar artículos en página principal
function renderNews() {
  const containers = [
      document.querySelector('.item-contenedor1'),
      document.querySelector('.item-contenedor2'),
      document.querySelector('.item-contenedor3')
  ];

  // filtrar por categoria
  let category;
  const currentPath = window.location.pathname;
  if (currentPath.includes('us.html')) {
      category = "US Election";
  } else if (currentPath.includes('innovation.html')) {
      category = "Innovation";
  } else if (currentPath.includes('sports.html')) {
      category = "sports";
  } else if(currentPath.includes('Buisness.html')) {
      category = "Business" 
  } 
  else if(currentPath.includes('culture.html')) {
    category = "Culture" 
}
else if(currentPath.includes('innovation.html')) {
  category = "Innovation" 
}else{
    category = null //paginas sin filtro
  }

  // Filtrar artículos solo si hay una categoría definida
  const filteredArticles = category ? articles.filter(article => article.category === category) : articles;

  // Distribuir los artículos filtrados en los contenedores
  filteredArticles.forEach((article, index) => {
      const container = containers[index % containers.length];
      const link = document.createElement('a');
      link.href = `article.html?id=${article.id}`;
      link.classList.add('item');

      const itemDiv = document.createElement('div');
      const img = document.createElement('img');
      img.src = article.image;
      img.alt = article.title;
      img.style.width = '100%';
      img.style.borderRadius = '10px';
      itemDiv.appendChild(img);

      const title = document.createElement('h3');
      title.textContent = article.title;
      itemDiv.appendChild(title);

      const description = document.createElement('p');
      description.textContent = article.description;
      itemDiv.appendChild(description);

      link.appendChild(itemDiv);
      container.appendChild(link);
  });
}

// ejecutar la fun para sacar las noticias
document.addEventListener('DOMContentLoaded', renderNews);



//sacar la barra lateral
const toggleButton = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
function toggleSidebar() {
    sidebar.classList.toggle('active');
}
toggleButton.addEventListener('click', toggleSidebar);
document.addEventListener('click', function (event) {
    if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});
