// récupérer le chemin du fichier html en cours
const currentPath = window.location.pathname;
const currentFileName = currentPath.split("/").pop() || "index.html";

// ajuster la base des chemins selon la localisation de la page
const isInPages = currentPath.includes("/pages/")
const basePath = isInPages ? "../" : "./";

// récupérer le chemin du fichier menu.json
const menuDataFile = `${basePath}data/menu.json`;

// récupérer les éléments utiles du DOM
const titleTag = document.querySelector("title");
let menu = document.querySelector("header nav.menu");

// charger les données puis construire le menu
fetch(menuDataFile)
    .then(response => {

        if (!response.ok) {
            throw new Error(`Impossible de charger ${menuDataFile}`);
        }
        return response.json();
    })
    .then(menuData => {
        buildMenu(menuData);
        updatePageTitle(menuData);
    })
    .catch(error => {
        console.error("Erreur lors du chargement du menu :", error);
    });


// fonction de construction du menu
function buildMenu(menuData) {
    const menuList = menuData["menu-list"];

    if (!menu) return;

    const fragment = document.createDocumentFragment();

    for (const item of menuList) {
        const link = document.createElement("a");
        link.href = `${basePath}${item.url}`;
        link.classList.add("menu-link");
        link.textContent = item.label;

        // détermine le nom du fichier ciblé par le lien
        const targetFileName = item.url.split("/").pop();

        // modifie les attributs de la page courante
        if (targetFileName === currentFileName) {
            link.classList.add("active");
            link.setAttribute("aria-label", "page");
        }

        fragment.appendChild(link);
    }

    menu.appendChild(fragment);
}


// fonction de modification du titre
function updatePageTitle(menuData) {
    const menuList = menuData["menu-list"];

    const currentPageData = menuList.find(item => {
        const targetFileName = item.url.split("/").pop();
        return targetFileName === currentFileName;
    });

    if (currentPageData && titleTag) {
        titleTag.textContent = currentPageData.title;
    }
}
