document.querySelector('.button').addEventListener('click', btnClicked);
document.querySelector('.delete').addEventListener('click', delteBtn);

function btnClicked(e) {
  const zip = document.querySelector('.input').value;
  const output = document.querySelector('.box');
  const alert = document.querySelector('.notification');

  fetch(`http://api.zippopotam.us/us/${zip}`)
    .then(response => response.json())
    .then(data => {
      if (zip.length > 5 || zip.length < 5 || zip === '' || isNaN(parseInt(zip))) {
        error();
      } else {
        alert.style.display = 'none';
        output.style.display = 'block';
        let outputs = '<h4 class="title box-t is-4"><u>Zip Information</u></h4>';
        document.querySelector('.inside').innerHTML = '<i class="fas fa-check"></i>';

        outputs += `
    <h4>Zip Code: <small class="has-text-grey">${zip}</small></h4>
    <h4>Place Name: <small class="has-text-grey">
    ${data.places[0]['place name']}</small></h4>
    <h4>Longitude: <small class="has-text-grey">${data.places[0].longitude}</small></h4>
    <h4>Latitude: <small class="has-text-grey">${data.places[0].latitude}</small></h4>
    <h4>State: <small class="has-text-grey">${data.places[0].state}</small></h4>
    <h4>State Abbreviation: <small class="has-text-grey">${data.places[0]['state abbreviation']}</small></h4>    `;

        output.innerHTML = outputs;
      }
    })
    .catch(err => error());

  e.preventDefault();
}

function delteBtn() {
  const alert = document.querySelector('.notification');
  alert.style.display = 'none';
  document.querySelector('.input').value = '';
  document.querySelector('.inside').innerHTML = '<i class="fas fa-check"></i>';
}

function error() {
  const zip = document.querySelector('.input').value;
  const output = document.querySelector('.box');
  const alert = document.querySelector('.notification');
  output.style.display = 'none';
  alert.style.display = 'block';
  document.querySelector('.inside').innerHTML = '<i class="fas fa-times"></i>';
}
