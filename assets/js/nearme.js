import currentPosition from './location.js'; 
import findCuisineKeyInMap from './imageFinder.js';


let divContainer = document.createElement('div'),
    cardHolder = document.createElement('div');

cardHolder.classList.add( 'd-flex', 'card-holder' );
divContainer.classList.add( 'container', '__align-cen' );

divContainer.appendChild( cardHolder );


let nearmeInit = {
  method: 'POST',
};


(async () => {
  try{
    let response = await fetch( '\/nearme', nearmeInit);
    let result = (response.ok) ? await response.json() : Promise.reject( response );

    result.data.nearby_restaurants.forEach( element => {
      let card = document.createElement('div');
      card.classList.add( 'card-2', 'center', '__pad0', '__nb', 'mb-4', 'bg-light' );
      
      card.innerHTML = `
      <img srcset="${element.thumb || findCuisineKeyInMap(element.type) }" class="card-img-top card-img-wrapper" loading="lazy">
      <div class="card-body p-1">   
  
        <h5 class="lan__p orange text-truncate __1_2em"> ${element.name} <\/h5>
  
        <div class="m-1 __09em"> 
          <span class="badge badge badge-dark"> &#9734; ${element.user_rating} <\/span>
          <span class="text-black-50">|<\/span>  <small class="text-black-50">${element.votes} ratings<\/small>
        <\/div>
  
        <p class="card-text __09em __bold text-dark">
          <span class="small-icon __loc2"><\/span>${element.location} 
        <\/p>
  
      </div>`;
  
      cardHolder.appendChild( card );
  
    });

  } catch (err) {console.error(err);}
})();


document.body.appendChild(divContainer);