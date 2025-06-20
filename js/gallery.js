const galleryContainer = document.getElementById('image-gallery-id');

fetch('js/gallery-grid-data.json')
  .then(response => response.json())
  .then(images => {
    images.forEach(image => {
      const item = document.createElement('div');
      item.classList.add('gallery-item');

      const link = document.createElement('a');
      link.href = image.full;
      link.target = '_blank'; //open in new tab

      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;

      const caption = document.createElement('div');
      caption.classList.add('gallery-grid-caption');
      caption.textContent = image.alt;

      link.appendChild(img);
      item.appendChild(link);
      item.appendChild(caption);
      galleryContainer.appendChild(item);
    });
  })
  .catch(err => console.error('Failed to load gallery:', err)); //in case of error occuring while loading the json file

  //issue with authorisation when loading JSON file when loading website in the browser directly, but works fine with local server on VScode