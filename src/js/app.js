document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

const initApp = () => {
    crearGaleria();
}

const crearGaleria = () => {
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i=1; i <= 12;i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="galeria imagen">
        `;

        imagen.onclick = () => {
            console.log('CLic');
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

const mostrarImagen = (id) => {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="galeria imagen">
    `;

    // Crear overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    overlay.onclick = () => {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');

        overlay.remove();
    }

    //Boton para cerrar el modal
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');

    cerrarModal.onclick = () => {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');

        overlay.remove();
    }

    overlay.appendChild(cerrarModal);

    // Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);

    body.classList.add('fijar-body');
}