import {overwriteElementPrototypes} from './dom/dom';

const GOOGLE_MAPS_KEY = '<YOUR_GOOGLE_MAPS_KEY>';

overwriteElementPrototypes();
export const fake = () => {
  console.log('faker');
};


const getStreetViewUrl = (streetName: string): string => {
  // return `https://picsum.photos/id/237/200/300`; // Dev image
  return `https://maps.googleapis.com/maps/api/streetview?location=${streetName}&size=456x456&key=${GOOGLE_MAPS_KEY}`;
};
const streetViewCache = {};

const iconMap = {
  'fahrradluftstationen': 'build',
};
const displayResults = (data: any) => {
  const keys = Object.keys(data);
  let finalHTML = '';
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = finalHTML;
  const winterdienst = `
  <img src="https://img.freepik.com/vektoren-kostenlos/flache-schneepflugillustration_23-2149845669.jpg?w=1380&t=st=1682171789~exp=1682172389~hmac=988c57fcdfd27e375973d2acfc7d2dd9cf2586ee5d54ed500881ceca88431234" width=150>
  `;
  keys.forEach((key: string) => {
    let rows = '';
    const categories = data[key].categories;
    categories.forEach((category: string) => {
      const icon = ''; // iconMap[category] || '';
      rows += `
      <li>
      <span class="material-icons">
${icon}
</span> ${category}
    </li>`
    });
    const cats = `
    
    <ul>
  ${rows}
</ul>
    `
    finalHTML += `
      <div class="searchResult" data-street="${key}">
        ${key}<br />
        ${keys.length === 1 ? cats : ''}<br />
        ${keys.length === 1 && cats.indexOf('winter') !== -1 ? winterdienst : ''}
      </div>
    `;
    // const winter = document.querySelector('#winterdienst');
    // if(keys.length === 1  && cats.indexOf('winter') !== -1){
    //   winter.innerHTML = winterdienst;
    // } else {
    //   winter.innerHTML = '';

    // }
  });
  searchResults.innerHTML = `
  <p>results: ${keys.length}</p>
  ${finalHTML}`;
  const searchResultElements = document.querySelectorAll('.searchResult');
  if (searchResultElements.length === 1) {
    const streetName = searchResultElements[0].getAttribute('data-street');
    const streetViewBox = document.getElementById('streetViewBox');
    streetViewBox.style.display = 'block';
    const streetViewImage = document.getElementById('streetViewImage');
    if (streetViewCache[streetName]) {
      // Load street view image from cache
      (streetViewImage as HTMLImageElement).src = streetViewCache[streetName];
    } else {
      // Load street view image and cache it
      const streetViewUrl = getStreetViewUrl(streetName);
      fetch(streetViewUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(blob => {
          const objectURL = URL.createObjectURL(blob);
          (streetViewImage as HTMLImageElement).src = objectURL;
          // Cache street view image
          streetViewCache[streetName] = objectURL;
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }
};





const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Fetch the data from the JSON file
fetch('data.json')
    .then((response: any) => response.json())
    .then((data: any) => {
      console.log(data);
      searchInput.addEventListener('input', () => {
        const searchTerm = (searchInput as HTMLInputElement).value.toLowerCase();
        console.log(searchTerm);
        const filteredData = {};
        Object.keys(data).forEach((key: string) => {
          if (key.toLowerCase().includes(searchTerm)) {
            filteredData[key] = data[key];
          }
        });
        displayResults(filteredData);
      });
    })
    .catch((error: any) => console.error(error));

