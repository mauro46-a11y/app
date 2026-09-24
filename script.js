const botonUbicacion = document.getElementById("botonUbicacion");

const resultado = document.getElementById("resultado");


botonUbicacion.addEventListener("click", obtenerUbicacion);


function obtenerUbicacion() {

    resultado.innerHTML = `
        <p>
            Solicitando permiso para acceder a tu ubicación...
        </p>
    `;


    if (!navigator.geolocation) {

        resultado.innerHTML = `
            <p>
                Tu navegador no permite obtener la ubicación.
            </p>
        `;

        return;
    }


    navigator.geolocation.getCurrentPosition(

        mostrarUbicacion,

        mostrarError,

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );
}


function mostrarUbicacion(posicion) {

    const latitud = posicion.coords.latitude;

    const longitud = posicion.coords.longitude;


    resultado.innerHTML = `

        <p>
            ✅ Ubicación obtenida correctamente.
        </p>

        <p>
            <strong>Latitud:</strong>
            <span class="coordenadas">
                ${latitud}
            </span>
        </p>

        <p>
            <strong>Longitud:</strong>
            <span class="coordenadas">
                ${longitud}
            </span>
        </p>

        <p>

            <a
                href="https://www.google.com/maps?q=${latitud},${longitud}"
                target="_blank"
            >
                📍 Abrir ubicación en Google Maps
            </a>

        </p>

    `;
}


function mostrarError(error) {

    if (error.code === 1) {

        resultado.innerHTML = `
            <p>
                ❌ No se concedió permiso para acceder a la ubicación.
            </p>
        `;

    }

    else if (error.code === 2) {

        resultado.innerHTML = `
            <p>
                ❌ No se pudo determinar la ubicación.
            </p>
        `;

    }

    else if (error.code === 3) {

        resultado.innerHTML = `
            <p>
                ⏱️ La solicitud de ubicación tardó demasiado.
            </p>
        `;

    }

    else {

        resultado.innerHTML = `
            <p>
                ❌ Ocurrió un error al obtener la ubicación.
            </p>
        `;

    }
}
