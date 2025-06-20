const imageStrip = document.querySelector('#carousel-track');
const textOverlay = document.querySelector('#carousel-caption');
const navBack = document.querySelector('#btn-prev');
const navForward = document.querySelector('#btn-next');

let slides = [];
let currentIndex = 0;

//Load JSON and initialise the many slides
fetch('js/carousel-data.json')
  .then(response => response.json())
  .then(data => {
    slides = data;
    populateCarousel();
  })
  .catch(err => console.error('Error loading carousel data:', err)); //In case of problems with loading JSON file

//Create image elements with json
function populateCarousel() {
  imageStrip.innerHTML = ''; //starts new

  slides.forEach(item => {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    imageStrip.appendChild(img);
  });

//wait for all images to load before calculating size for proper rendering
  const allImages = imageStrip.querySelectorAll('img');
  let loaded = 0;

  allImages.forEach(img => {
    img.onload = () => {
      loaded++;
      if (loaded === allImages.length) {
        initializeCarousel(allImages);
      }
    };
  });
}

function initializeCarousel(imageElements) {
  const slideWidth = imageElements[0].offsetWidth;

//Set container width
  imageStrip.style.width = `${slideWidth * imageElements.length}px`;

//show first image
  displaySlide(currentIndex, slideWidth);

//Event listener
  navBack.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + imageElements.length) % imageElements.length;
    displaySlide(currentIndex, slideWidth);
  });

  navForward.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % imageElements.length;
    displaySlide(currentIndex, slideWidth);
  });
}

//Display a specific slide
function displaySlide(index, slideWidth) {
  const offset = -index * slideWidth;
  imageStrip.style.left = `${offset}px`;
  textOverlay.textContent = slides[index].alt;
}

//Again, problem with JSON file loading due to "lack of authorisation", use a local server for website/VScode I guess :)