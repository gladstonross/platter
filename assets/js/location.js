let currentPosition = {};

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

function success(pos) {
    var crd = pos.coords;
    currentPosition.lat = parseFloat( `${ crd.latitude }` );
    currentPosition. lon = parseFloat( `${ crd.longitude }` );
  }
  
  function error(err) {
    console.warn( `ERROR(${ err.code }): ${ err.message }` );
  }

  
if (navigator.geolocation) navigator.geolocation.getCurrentPosition(success,error,options);
else;

export default currentPosition;