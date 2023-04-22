const apiKey = 'DEIN_API_SCHLÜSSEL';
const streetName = 'EXAMPLE-STREET';

// Erstelle eine Anfrage an die Street View API
const url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${streetName}&key=${apiKey}`;

// Führe die Anfrage aus und setze das Ergebnis als Hintergrundbild für das HTML-Element mit der ID "streetViewImage"
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.blob();
  })
  .then(blob => {
    return URL.createObjectURL(blob);
    // const objectURL = URL.createObjectURL(blob);
    // const img = document.getElementById('streetViewImage');
    // img.style.backgroundImage = `url(${objectURL})`;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });