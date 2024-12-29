        const API_KEY = 'AIzaSyAA0N_YasFGUvdp1GjUFXi5aZQFLaGqnPg'; 
        const PARENT_FOLDER_ID = '1IUy3qj8Xb4-OHHuNqJLCMzphx90kD7wc';

        // Obtener subcarpetas de la carpeta principal
        const getSubfolders = async () => {
            const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${PARENT_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}`);
            const data = await response.json();
            return data.files || [];
        };

        // Obtener imágenes de una subcarpeta
        const getImagesFromFolder = async (folderId) => {
            const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='image/png'&fields=files(id,name,thumbnailLink)&key=${API_KEY}`);
            const data = await response.json();
            return data.files || [];
        };

        // Cargar las categorías dinámicamente
        const loadCategories = async () => {
            const categoriesDiv = document.getElementById('categories');
            const subfolders = await getSubfolders();

            subfolders.forEach(folder => {
                const button = document.createElement('button');
                button.className = 'category-button';
                button.textContent = folder.name;
                button.dataset.folderId = folder.id;

                button.addEventListener('click', async () => {
                try {
                    const images = await getImagesFromFolder(folder.id);

                    // Guarda las imágenes y el nombre de la categoría en localStorage
                    localStorage.setItem('images', JSON.stringify(images));
                    localStorage.setItem('categoryName', folder.name);

                    // Redirige al archivo de plantilla
                    window.location.href = 'template.html';
                } catch (error) {
                    console.error('Error al cargar las imágenes:', error);
                }
            });


                categoriesDiv.appendChild(button);
            });
        };

      

        // Inicializar la página
        loadCategories();
