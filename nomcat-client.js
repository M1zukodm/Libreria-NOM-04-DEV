/**
 * NOM-04 Client Library
 * Motor de autocompletado para los 9 catálogos normativos de salud.
 * * Uso:
 * 1. Incluir este script en el HTML.
 * 2. Usar data-catalog="" en el form contenedor.
 * 3. Usar class="nomcat-search" en el input buscador.
 * 4. Usar data-field="" en los inputs receptores.
 */

class NomCatClient {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;

        // CONFIGURACIÓN MAESTRA
        // Define cómo se ve cada ítem en la lista (HTML)
        this.configs = {
            "codigos_postales": {
                render: (d) => `<strong>${d.d_codigo}</strong> - ${d.d_asenta}<br><small class="text-muted">${d.D_mnpio}, ${d.d_estado}</small>`
            },
            "clues": {
                render: (d) => `<strong>${d.CLUES}</strong> - ${d["NOMBRE DE LA UNIDAD"]}<br><small class="text-muted">${d.ENTIDAD}</small>`
            },
            "entidades": {
                render: (d) => `<strong>${d.ENTIDAD_FEDERATIVA}</strong> (${d.ABREVIATURA})`
            },
            "municipios": {
                render: (d) => `<strong>${d.MUNICIPIO}</strong><br><small>Clave: ${d.CVEGEO}</small>`
            },
            "localidades": {
                render: (d) => `<strong>${d.LOCALIDAD}</strong><br><small>${d.NOM_MUN || 'Municipio'}, ${d.NOM_ENT || ''}</small>`
            },
            "nacionalidades": {
                render: (d) => `<strong>${d.pais}</strong> (${d["clave nacionalidad"]})`
            },
            "formacion": {
                render: (d) => `<strong>${d.FORMACION_ACADEMICA}</strong><br><small>${d.AGRUPACION}</small>`
            },
            "religiones": {
                render: (d) => `<strong>${d.CREDO || d["DENOMINACIÓN"]}</strong>`
            },
            "lenguas_indigenas": {
                render: (d) => `<strong>${d["LENGUA INDÍGENA"]}</strong><br><small>${d.FAMILIA}</small>`
            },
            "default": {
                render: (d) => `<strong>${Object.values(d)[0]}</strong>`
            }
        };

        this.init();
    }

    init() {
        // Detecta automáticamente formularios al cargar
        const forms = document.querySelectorAll('[data-catalog]');
        if (forms.length === 0) return;

        console.log(`🚀 NomCat Client: Detectados ${forms.length} catálogos en esta página.`);
        forms.forEach(form => this.attachToForm(form));
    }

    attachToForm(form) {
        const catalogName = form.dataset.catalog;
        const searchInput = form.querySelector('.nomcat-search');

        if (!searchInput) {
            console.warn(`⚠️ NomCat: El contenedor '${catalogName}' no tiene un input con clase 'nomcat-search'.`);
            return;
        }

        // Crear contenedor visual de resultados
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'nomcat-results';
        // Insertar después del input
        searchInput.parentNode.insertBefore(resultsDiv, searchInput.nextSibling);

        // Eventos de teclado (con debounce para no saturar la API)
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            const term = e.target.value.trim();

            if (term.length < 1) {
                resultsDiv.classList.remove('active');
                return;
            }

            // Espera 300ms antes de buscar
            debounceTimer = setTimeout(() => this.fetchData(catalogName, term, resultsDiv, form), 300);
        });

        // Cerrar lista al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !resultsDiv.contains(e.target)) {
                resultsDiv.classList.remove('active');
            }
        });
    }

    async fetchData(catalog, term, resultsDiv, form) {
        // Mostrar loading
        resultsDiv.innerHTML = '<div class="p-2 text-center text-muted"><i class="fas fa-spinner fa-spin"></i> Buscando...</div>';
        resultsDiv.classList.add('active');

        try {
            const res = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ catalogo: catalog, search: term })
            });

            if (!res.ok) throw new Error("Error HTTP: " + res.status);

            const data = await res.json();

            if (data.exito && data.resultados.length > 0) {
                this.renderList(data.resultados, catalog, resultsDiv, form);
            } else {
                resultsDiv.innerHTML = '<div class="p-2 text-center text-muted small">Sin resultados</div>';
            }
        } catch (err) {
            console.error("NomCat Error:", err);
            resultsDiv.innerHTML = '<div class="p-2 text-center text-danger small">Error de conexión</div>';
        }
    }

    renderList(items, catalog, resultsDiv, form) {
        resultsDiv.innerHTML = '';
        const config = this.configs[catalog] || this.configs['default'];

        // Renderizar máximo 3 resultados
        items.slice(0, 3).forEach(item => {
            const div = document.createElement('div');
            div.className = 'nomcat-item';
            div.innerHTML = config.render(item.data);

            if (item.origen) {
                div.innerHTML += `<span class="badge bg-secondary float-end" style="font-size:0.6em">${item.origen}</span>`;
            }

            // Click en un ítem
            div.addEventListener('click', () => {
                this.fillForm(form, item.data);
                resultsDiv.classList.remove('active');
                resultsDiv.innerHTML = ''; // Limpiar para prevenir parpadeos
            });

            resultsDiv.appendChild(div);
        });
    }

    fillForm(form, data) {
        // Buscar inputs destino
        const targetInputs = form.querySelectorAll('[data-field]');

        targetInputs.forEach(input => {
            const fieldName = input.dataset.field;
            // Búsqueda insensible a mayúsculas (ej: 'pais' encuentra 'Pais' o 'PAIS')
            const key = Object.keys(data).find(k => k.toLowerCase() === fieldName.toLowerCase());

            if (key && data[key] !== undefined) {
                input.value = data[key];

                // Efecto visual de "flash" azul
                input.style.transition = "background-color 0.3s";
                input.style.backgroundColor = "#e8f0fe";
                setTimeout(() => input.style.backgroundColor = "", 500);
            }
        });
    }
}