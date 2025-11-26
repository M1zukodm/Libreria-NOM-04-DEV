# 🏥 NOM-04 Cliente SDK

¡Bienvenido! Este proyecto ofrece una solución completa para integrar el **autocompletado de los 9 Catálogos Normativos de Salud (NOM-04)** en cualquier formulario web de manera sencilla y profesional.

---

## 📌 Descripción General

El sistema consta de dos partes principales:

### 🔧 Backend
Una **Azure Function** que procesa búsquedas masivas optimizadas.

### 💻 Frontend
Una librería JS (**nomcat-client.js**) para integración *plug-and-play*.

---

## 📦 Contenido del Repositorio

| Archivo | Descripción |
|---------|-------------|
| **nomcat-client.js** | El motor. Contiene toda la lógica de autocompletado y conexión. |
| **index.html** | Portal de demostración con guía interactiva y generador de código. |
| **README.md** | Este manual de uso e integración. |

---

## 🚀 Guía Rápida de Integración

### 1. Importar el script
Descarga `nomcat-client.js` y agrégalo antes de `</body>`.

```html
<script src="js/nomcat-client.js"></script>
```

---

### 2. Inicializar

```js
document.addEventListener('DOMContentLoaded', () => {
    const API_URL = "https://tu-app.azurewebsites.net/api/ConsultarCatalogos";
    new NomCatClient(API_URL);
});
```

---

### 3. Crear Formularios (HTML Declarativo)
No necesitas escribir JS adicional. Usa `data-catalog` y `data-field`.

#### Ejemplo: Buscador de Código Postal

```html
<form data-catalog="codigos_postales">
    <div class="nomcat-wrapper">
        <input type="text" class="form-control nomcat-search" placeholder="Buscar CP...">
    </div>

    <input type="text" data-field="d_asenta" placeholder="Colonia" readonly>
    <input type="text" data-field="D_mnpio" placeholder="Municipio" readonly>
    <input type="text" data-field="d_estado" placeholder="Estado" readonly>
</form>
```

---

## 📚 Referencia de Catálogos y Campos
Usa estos valores en `data-catalog` y `data-field`.

### 🗂 Tabla de Catálogos Disponibles

| **Catálogo (data-catalog)** | **Campos Disponibles (data-field)** |
|-----------------------------|--------------------------------------|
| `codigos_postales` | d_codigo, d_asenta, D_mnpio, d_estado |
| `clues` | CLUES, NOMBRE DE LA UNIDAD, ENTIDAD, JURISDICCION |
| `entidades` | CATALOG_KEY, ENTIDAD_FEDERATIVA, ABREVIATURA |
| `municipios` | CVEGEO, MUNICIPIO, NOM_ENT |
| `localidades` | CVEGEO, LOCALIDAD, NOM_MUN |
| `nacionalidades` | clave nacionalidad, pais, codigo pais |
| `formacion` | CATALOG_KEY, FORMACION_ACADEMICA, AGRUPACION |
| `religiones` | CLAVE CREDO, CREDO, GRUPO |
| `lenguas_indigenas` | CLAVE_LENGUA, LENGUA INDÍGENA, FAMILIA |

---

## 🎨 Estilos CSS Requeridos
Agrega estos estilos para que la lista desplegable funcione correctamente.

```css
/* Contenedor relativo */
.nomcat-wrapper { position: relative; }

/* Lista flotante */
.nomcat-results {
    position: absolute;
    top: 100%; left: 0; right: 0;
    z-index: 1000;
    background: white;
    border: 1px solid #ddd;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    max-height: 200px;
    overflow-y: auto;
    display: none;
}

/* Mostrar lista activa */
.nomcat-results.active { display: block; }

/* Estilo de items */
.nomcat-item {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
}
.nomcat-item:hover { background-color: #f8f9fa; }
```

---

## ❤️ Hecho con dedicación
Creado para **agilizar la captura de datos normativos** en sistemas de salud y cumplir NOM-04 de forma profesional.

---

