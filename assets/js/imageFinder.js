
const lower = function(str) {
    if( typeof str == 'string' && str.length) return str.charAt(0).toLowerCase() + str.slice(1);
};

const randomImages = [
    '/photo/cuisine/random/random-1.jpg',
    '/photo/cuisine/random/random-2.jpg',
    '/photo/cuisine/random/random-3.jpg',
    '/photo/cuisine/random/random-4.jpg',
  ];


  let pizzaImages = [
      '/photo/cuisine/piz/pizza-1.jpg',
      '/photo/cuisine/piz/pizza-2.jpg',
      '/photo/cuisine/piz/pizza-3.jpg',
      '/photo/cuisine/piz/pizza-4.jpg',
      '/photo/cuisine/piz/pizza-5.jpg',
      '/photo/cuisine/piz/pizza-6.jpg',
      '/photo/cuisine/piz/pizza-7.jpg',
      '/photo/cuisine/piz/pizza-8.jpg',
      '/photo/cuisine/piz/pizza-9.jpg',
      '/photo/cuisine/piz/pizza-10.jpg',  
  ];

  let burgerImages = [
      // image URLs here
      '/photo/cuisine/bur/burger-1.jpg',
      '/photo/cuisine/bur/burger-2.jpg',
      '/photo/cuisine/bur/burger-3.jpg',
      '/photo/cuisine/bur/burger-4.jpg',
      '/photo/cuisine/bur/burger-5.jpg',
      '/photo/cuisine/bur/burger-6.jpg',
      '/photo/cuisine/bur/burger-7.jpg',
  ];

  let dessertImages = [
      // image URLs here
      '/photo/cuisine/desserts/pastry-1.jpg',
      '/photo/cuisine/desserts/pastry-2.jpg',
      '/photo/cuisine/desserts/pastry-3.jpg',
      '/photo/cuisine/desserts/pastry-4.jpg',
      '/photo/cuisine/desserts/pastry-5.jpg',
      '/photo/cuisine/desserts/pastry-6.jpg',
      '/photo/cuisine/desserts/pastry-7.jpg',
  ];

  let seafoodImages = [
      // image URLs here
      '/photo/cuisine/seafood/seafood-1.jpg',
      '/photo/cuisine/seafood/seafood-2.jpg',
      '/photo/cuisine/seafood/seafood-3.jpg',
      '/photo/cuisine/seafood/seafood-4.jpg',
      '/photo/cuisine/seafood/seafood-5.jpg',
      '/photo/cuisine/seafood/seafood-6.jpg',
      '/photo/cuisine/seafood/seafood-7.jpg',
  ];

  let chineseImages = [
      // image URLs here
      '/photo/cuisine/asian/asian-1.jpg',
      '/photo/cuisine/asian/asian-2.jpg',
      '/photo/cuisine/asian/asian-3.jpg',
      '/photo/cuisine/asian/asian-4.jpg',
      '/photo/cuisine/asian/asian-5.jpg',
      '/photo/cuisine/asian/asian-6.jpg',
      '/photo/cuisine/asian/asian-7.jpg',  
  ];

  const randomImg = new Map();

  randomImg.set('othercuisines', randomImages );

  // cuisines
  randomImg.set('pizza', pizzaImages );
  randomImg.set('burger', burgerImages );
  randomImg.set('seafood', seafoodImages );
  randomImg.set('chinese', chineseImages );
  randomImg.set('bakery', dessertImages );
  randomImg.set('desserts', dessertImages );



  const generateRandomImage = function (arr) {
      if ( !Array.isArray(arr) || arr.length == 0 ) return;
      const index = Math.random() * arr.length >> 0;
      return arr[index];
  };


  export default function findCuisineKeyInMap( cuisineType ) {

      let result = randomImg.get( 'othercuisines' ); 

      let splitWords = cuisineType.split(','),


      cuisineTypeMap = new Map();
      
      splitWords.map( (key) => {
          let trimWord = lower( key.trim() );
          cuisineTypeMap.set( trimWord , trimWord );
      });

      cuisineTypeMap.forEach( (val,item) => {
          if ( randomImg.has( item ) )  result = randomImg.get( item ) ;
      });
     
      return generateRandomImage( result );
  }