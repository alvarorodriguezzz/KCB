// Definición de <relative-time>
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

// Definición de datos de artículos
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
      "category": "Technology"
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
      "category": "Technology"
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
      "category": "Technology"
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

  // Detectar la categoría según la página actual
  let category;
  const currentPath = window.location.pathname;
  if (currentPath.includes('us.html')) {
      category = "US Election";
  } else if (currentPath.includes('innovation.html')) {
      category = "Innovation";
  } else if (currentPath.includes('sports.html')) {
      category = "Sport";
  } else {
      category = null;  // Otras páginas sin filtrado específico
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

// Ejecutar la función al cargar el contenido de la página
document.addEventListener('DOMContentLoaded', renderNews);






// Función para la barra lateral
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
