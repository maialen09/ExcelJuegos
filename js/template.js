const puntuacionContainer = document.getElementById('puntuacion');
let score = parseInt(puntuacionContainer.getAttribute('data-value'));
const images = JSON.parse(localStorage.getItem('images'));
const categoryName = localStorage.getItem('categoryName');
document.getElementById('category-name').textContent = categoryName;

const gallery = document.getElementById('gallery');
        images.forEach(image => {
            const container = document.createElement('div'); // Crea un contenedor por imagen
            const img = document.createElement('img');
            img.src = image.thumbnailLink;
            img.alt = image.name;
            container.appendChild(img);

            // Crear el campo de texto para el nombre de la imagen
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Escribe el nombre...';
            container.appendChild(input);

             // Crear el botón submit
             input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();  // Prevenir el comportamiento por defecto
                    const inputValue = input.value.trim();
                    if (inputValue) {
                        let str = image.name;
                        let nombre = str.replace(".png", "");

                        if (nombre == inputValue){

                        //alert(`El nombre introducido coincide con el de la imagen`);

                         input.style.backgroundColor = "#90EE90";   
                         input.disabled = true;
                         score += 10; 
                         puntuacionContainer.setAttribute('data-value', score);
                         puntuacionContainer.textContent = `Puntuacion: ${score}`
                            

                        }

                        else{

                       // alert(`El nombre introducido no coincide con el de la imagen`);
                       input.style.backgroundColor = "lightcoral";   
                         score -= 10; 
                         puntuacionContainer.setAttribute('data-value', score);
                         puntuacionContainer.textContent = `Puntuacion: ${score}`


                        }


                    } else {
                        alert('Por favor, escribe un nombre para la imagen.');
                        input.value = '';


                    }

                }
            });

           

            gallery.appendChild(container);
        });