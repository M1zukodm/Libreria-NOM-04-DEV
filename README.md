🏥 NOM-04 Client Library

Librería ligera de JavaScript para integrar el autocompletado de los 9 Catálogos Normativos de Salud (NOM-04) en cualquier formulario web.

📦 Instalación

Descarga el archivo nomcat-client.js.

Guárdalo en la carpeta public o js de tu proyecto.

Importalo en tu HTML antes de cerrar el </body>.

<script src="path/to/nomcat-client.js"></script>


🚀 Inicialización

En tu archivo principal de JavaScript o en un bloque <script>, inicializa el cliente apuntando a tu Azure Function:

document.addEventListener('DOMContentLoaded', () => {
    // Reemplaza con la URL real de producción
    const API_URL = "[https://tu-app.azurewebsites.net/api/ConsultarCatalogos](https://tu-app.azurewebsites.net/api/ConsultarCatalogos)";
    
    new NomCatClient(API_URL);
});


🛠 Uso (HTML Declarativo)

No necesitas escribir JavaScript para cada formulario. La librería usa Atributos de Datos para funcionar automáticamente.

Estructura Básica

Contenedor: Agrega data-catalog="NOMBRE_CATALOGO" al <form> o <div> padre.

Buscador: Agrega la clase nomcat-search al input donde el usuario escribirá.

Receptores: Agrega data-field="CAMPO_JSON" a los inputs que se deben llenar automáticamente.

Ejemplo: Buscador de Códigos Postales

<form data-catalog="codigos_postales">
    
    <!-- Input que activa la búsqueda -->
    <input type="text" class="form-control nomcat-search" placeholder="Escribe CP o Colonia...">
    
    <!-- Inputs que reciben la información -->
    <input type="text" data-field="d_asenta" placeholder="Colonia" readonly>
    <input type="text" data-field="D_mnpio" placeholder="Municipio" readonly>
    <input type="text" data-field="d_estado" placeholder="Estado" readonly>

</form>


📚 Catálogos Disponibles (data-catalog)

Catálogo

Clave para data-catalog

Campos Principales (data-field)

Códigos Postales

codigos_postales

d_codigo, d_asenta, D_mnpio, d_estado

Unidades Salud

clues

CLUES, NOMBRE DE LA UNIDAD, ENTIDAD, JURISDICCION

Municipios

municipios

CVEGEO, MUNICIPIO, NOM_ENT

Localidades

localidades

CVEGEO, LOCALIDAD, NOM_MUN

Entidades

entidades

CATALOG_KEY, ENTIDAD_FEDERATIVA, ABREVIATURA

Nacionalidades

nacionalidades

clave nacionalidad, pais, codigo pais

Formación

formacion

CATALOG_KEY, FORMACION_ACADEMICA, AGRUPACION

Religiones

religiones

CLAVE CREDO, CREDO, GRUPO

Lenguas

lenguas_indigenas

CLAVE_LENGUA, LENGUA INDÍGENA, FAMILIA

🎨 Estilos CSS Requeridos

Para que el menú desplegable funcione correctamente, agrega esto a tu CSS:

.nomcat-wrapper { position: relative; }

.nomcat-results {
    position: absolute; 
    top: 100%; left: 0; right: 0; z-index: 1000;
    background: white; border: 1px solid #ccc;
    max-height: 200px; overflow-y: auto;
    display: none;
}

.nomcat-results.active { display: block; }
