window.onload = function () {
  getInformation();
};

function getInformation() {
  fetch("https://api.jikan.moe/v4/anime?q=")
    .then((response) => response.json())
    .then((data) => {
      // Llama a la función para mostrar los cards, pasando la información recibida de la API como argumento.
      showCards(data);
    })
    .catch((error) => {
      console.error("Ha ocurrido un error al llamar a la API:", error);
    });
}

$("#btn-cargar").click(function (event) {
  event.preventDefault();
  buscar();
});

function buscar() {
  var indicador = $("#txtIndicador").val();
  var url = "https://api.jikan.moe/v4/anime?q=" + indicador + "&sfw"; // + newFecha;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Llama a la función para mostrar los cards, pasando la información recibida de la API como argumento.
      showCards(data);
    })
    .catch((error) => {
      console.error("Ha ocurrido un error al llamar a la API:", error);
    });
}

function showCards(data) {
  var indicador = $("#txtIndicador").val();
  var total = data.pagination.items.count;
  total -= 1;

  $("#col-1").empty();
  $("#col-2").empty();
  $("#info").empty();
  if(indicador === ""){
    $("#col-1")
    .append("<br> <br> <br>Animes que podrían interesarte...");
  }
  else{
    $("#col-1")
    .append("<br> <br> <br>De la búsqueda de: " + indicador + "<br>")
    .append("Se han encontrado " + total + " resultados. <br>");
  }
    $("#col-2")
    .append("<br> <br> <br>¿No encuentras lo que buscas?<br>")
    .append(" <a class='icon-link' href='https://www3.animeflv.net/browse?q="+indicador+"'>" +
    "   Buscar en AnimeFLV" +
    "   <svg class='bi' aria-hidden='true'><use xlink:href='#arrow-right'></use></svg>" +
    " </a>")
    .append(" <a class='icon-link' href='https://www.crunchyroll.com/es/search?q="+indicador+"'>" +
    "   Buscar en Crunchyroll" +
    "   <svg class='bi' aria-hidden='true'><use xlink:href='#arrow-right'></use></svg>" +
    " </a>");

  // Aquí se generan las cartas de la búsqueda de los animes.
  for (i = 0; i <= total; i++) {
    // console.log(i);

    var $titulo = data.data[i].titles[0].title;
    var $url_imagen = data.data[i].images.jpg.image_url;

    $("#info").append(
      "<div class='col' >" +
        "<div class='card mt-5' style='width: 50%;'>" +
        "<img src='" +
        $url_imagen +
        "' id='" +
        i +
        "' class='card-img-anime card-img-top' alt='...'><div class='card-titulo-anime card-body'><h5 class='card-title'>" +
        $titulo +
        "</h5></div></div></div>"
    );
  }
}

var cardSeleccionada = document.querySelector("#info");
cardSeleccionada.addEventListener("click", capturarDatos, false);
function capturarDatos(e, url) {
  if (e.target !== e.currentTarget) {
    var indicador = $("#txtIndicador").val();
    var url = "https://api.jikan.moe/v4/anime?q=" + indicador + "&sfw";
    var cardId = e.target.id;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data[0].url)
        // console.log(indicador)
        // console.log(data.data[0].titles[0].title);
        var titulo = data.data[cardId].titles[0].title;

        $("#container-info").empty();
        $("#info").empty();
        $("#container-col1").append(
            "      <div class='card text-bg-dark p-3' style='width: 100%'>" +
            "        <img" +
            "          src='"+data.data[cardId].images.jpg.large_image_url+"'" +
            "          class='card-img-top'" +
            "          alt='...'" +
            "        />" +
            "        <div class='card-body'>" +
            "          <h5 class='card-title'>"+data.data[cardId].titles[0].title+"</h5>" +
            "          <h5 class='card-title'>["+data.data[cardId].titles[1].title+"]</h5>" +
            "          <p class='card-text'></p>" +
            "        </div>" +
            "        <ul id='container-ul' class='list-group list-group-flush p-3'>" +
            "          <h5 class='info-anime list-group-item text-center'>[INFORMACIÓN]</h5>" +
            "          <li class='info-anime list-group-item'>Tipo: "+data.data[cardId].type+"</li>" +
            "          <li class='info-anime list-group-item'>Episodios: "+data.data[cardId].episodes+"</li>" +
            "          <li class='info-anime list-group-item'>Clasificación: "+data.data[cardId].rating+"</li>" +
            "          <li class='info-anime list-group-item'>Duración: "+data.data[cardId].duration+"</li>" +
            "          <li class='info-anime list-group-item'>" +
            "            Estado:" +
            "            <span class='text-warning'>"+data.data[0].status+"</span>" +
            "          </li>" +
            "          <li class='info-anime list-group-item'>" +
            "            Temporada: "+data.data[cardId].season+
            "          </li>" +
            "          <li class='info-anime list-group-item'>" +
            "            Desde: "+data.data[cardId].aired.string+"" +
            "          </li>" +
            "          <li id='container-li-generos' class='info-anime list-group-item'>"+
            "Géneros:");

            var generos = data.data[cardId].genres;
            i = 0;
            generos.forEach((asd) => {
              console.log("Elemento: " + data.data[cardId].genres[i].name);
              $("#container-li-generos").append(
                "            <p>" +
                "              <a" +
                "                href='"+data.data[cardId].genres[i].url+"'" +
                "                class='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'" +
                "                >"+data.data[cardId].genres[i].name+"</a" +
                "              >" +
                "            </p>");
              i = i + 1;
            });

            $("#container-ul").append(
              "          <li id='container-li-tematicas' class='info-anime list-group-item'>" +
              "            Temáticas:");

            var tematicas = data.data[cardId].themes;
            i = 0;
            tematicas.forEach((asd) => {
              console.log("Temática: " + data.data[cardId].themes[i].url + asd);
              $("#container-li-tematicas").append(
                "            <p>" +
                "              <a" +
                "                href='"+data.data[cardId].themes[i].url+"'" +
                "                class='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'" +
                "                >"+data.data[cardId].themes[i].name+"</a" +
                "              >" +
                "            </p>");
              i = i + 1;
            });

            $("#container-ul").append(
            "          <li class='info-anime list-group-item'>Estudio: "+data.data[cardId].studios[0].name+"</li>" +
            "        </ul>" +
            "        <div class='card-body'>" +
            "          <a href='https://www3.animeflv.net/browse?q="+data.data[cardId].titles[0].title+"' class='card-link'>Buscar en AnimeFLV</a><br />" +
            "          <a href='https://www.crunchyroll.com/es/search?q="+data.data[cardId].titles[0].title+"' class='card-link'>Buscar en Crunchyroll</a>");
            
            if (data.data[cardId].trailer.url === null){
              $("#container-col2").append(
                "  <img src='../img/anime-paisaje.png' class='img-thumbnail' alt='...' width='300'></img>"
              );
            }else{
            $("#container-col2").append(
            "      <iframe" +
            "        width='560'" +
            "        height='315'" +
            "        src='"+data.data[cardId].trailer.url+"'" +
            "        title='YouTube video player'" +
            "        frameborder='0'" +
            "        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'" +
            "        allowfullscreen" +
            "      ></iframe>");
          }

            $("#container-col2").append(
            "      <div class='card text-bg-dark mb-3' style='max-width: 100%'>" +
            "        <div class='card-header'>" +
            "          <p>" +
            "            <button" +
            "              id='btn-cargar'" +
            "              class='btn btn-primary'" +
            "              type='button'" +
            "              data-bs-toggle='collapse'" +
            "              data-bs-target='#collapseExample'" +
            "              aria-expanded='false'" +
            "              aria-controls='collapseExample'" +
            "            >" +
            "              Sinopsis:" +
            "            </button>" +
            "          </p>" +
            "        </div>" +
            "        <div class='card-body'>" +
            "          <div class='collapse' id='collapseExample'>" +
            "            "+data.data[cardId].synopsis+
            "            </div>" +
            "          </div>" +
            "        </div>" +
            "      </div>" +
            "    </div>" +
            "</div>"
        );

        // window.location.href = "https://www3.animeflv.net/browse?q=" + titulo;
      });
  }
  e.stopPropagation();
}

function animeDetalles() {

}