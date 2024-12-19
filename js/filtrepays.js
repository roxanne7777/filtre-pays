(function () {
  let filtre__bouton = document.querySelectorAll('.filtre__bouton button')
  console.log(filtre__bouton.length);

  const pays = [
    "France",
    "États-Unis",
    "Canada",
    "Argentine",
    "Chili",
    "Belgique",
    "Maroc",
    "Mexique",
    "Japon",
    "Italie",
    "Islande",
    "Chine",
    "Grèce",
    "Suisse",
  ];

  for (const elm of filtre__bouton) {
    elm.addEventListener("click", function (e) {
      const paysIndex = e.target.dataset.id;
      const paysNom = pays[paysIndex];
      console.log("Pays sélectionné:", paysNom);
      extraire_pays(paysNom);
    });
  }

 function extraire_pays(paysNom) {
   fetch(
     `http://localhost/31W/wp-json/wp/v2/posts?filter[pays]=${paysNom}&per_page=30`
   )
     .then((response) => {
       if (!response.ok) {
         throw new Error(`Erreur HTTP ! statut : ${response.status}`);
       }
       return response.json();
     })
     .then((data) => {
       console.log("Articles récupérés:", data);
       afficherArticles(data);
     })
     .catch((error) =>
       console.error("Erreur lors de l'extraction des articles", error)
     );
 }

  function afficherArticles(data) {
    const sectionArticles = document.querySelector(".filtre__articles");
    sectionArticles.innerHTML = "";

    if (data.length === 0) {
      sectionArticles.innerHTML = "<p>Aucun article trouvé pour ce pays.</p>";
      return;
    }

    const articlesHTML = data
      .map((article) => {
        return `
        <article class="article">
          <h2>${article.title.rendered}</h2>
          <div class="article__contenu">${article.excerpt.rendered}</div>
          <a href="${article.link}" target="_blank" class="article__lien">Lire la suite</a>
        </article>
      `;
      })
      .join("");

    sectionArticles.innerHTML = articlesHTML;
  }

})()