(function() {
    'use strict';
    

        const body = document.body,
              doc = document,
              win = document.window,
              myForm = doc.querySelector( '#submit-form' ),
              submitBtn = doc.querySelector( '#submit' ),
              locationInputField = doc.querySelector('#location'),
              query = doc.querySelector('#restaurant-name'),
              scrollToTopBtn = document.querySelector('#topbtn');

        const createElem = function (elem) {
            if (typeof elem !== 'string') return; 
            else { return doc.createElement(elem); }
        };

        let span = createElem({});

        myForm.addEventListener('keyup', function(e) {
            if (query.value !== '') submitBtn.removeAttribute('disabled');
            else { submitBtn.setAttribute('disabled', ''); }
        });
        
        
        myForm.addEventListener( 'submit', async function(e) {
            e.preventDefault();
            
            const fetchInit = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `q=${ query.value }&city=${ locationInputField.value }`,
            };
            
            try{
                const res = await fetch( '/search', fetchInit );
                const data = await res.json();
                var container = document.querySelector( '.results' );
                container.innerHTML = '';
                console.log(data)
                populateSearchData( data.restaurants );
            }catch (err) {
                console.error(`${ err }`);
            }
            
        });


    const randomImages = [
        //  '/photo/default-thum.png',

        'https://images.unsplash.com/photo-1478144592103-25e218a04891?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1268&q=80',

        'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80', 

        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',

        'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',

        'https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',

        'https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80',

        ];

        const generateRandomImage = function (arr) {
            if (!Array.isArray(arr) || arr.length == 0) return;
            const index = Math.floor(Math.random() * arr.length);
            return arr[index];
        };

        

        const populateSearchData = function ( data ) {

            const container = document.querySelector('.results');

            if (data.length < 1) container.innerHTML = 'nothing found';
            else{
                data.forEach(function (r,i) {

                    if ('content' in document.createElement('template')) {

                        const template = document.querySelector('#productrow');
                        const clone = template.content.cloneNode(true);
                        const image = clone.querySelector('.__card-img');
                        const title = clone.querySelector('.info .__card-title');
                        const location = clone.querySelector('.info .card-text');
                        const city = clone.querySelector('.info .city');
                        const rate = clone.querySelector('.rate');
                        const button = clone.querySelector('.block-link');


                        image.setAttribute('width', 130);
                        image.setAttribute('height', 100);

                        if (r.thumbnail === '') image.src = `${generateRandomImage(randomImages) }`;
                        else { image.src = r.thumbnail; }
                        title.textContent = r.name;
                        location.textContent = r.location.address;
                        city.textContent = r.location.city;
                        rate.textContent = r.user_rating;
                        button.href = r.url;
                
                        setTimeout(() => container.appendChild(clone), i*120);
                        
                    }
                });
            }
            

        };


    
    const topFunction = function() {
        doc.querySelector('.__brand').scrollIntoView({ behavior: 'smooth' });
    };


    
    setTimeout(() => {
        doc.body.addEventListener('scroll', function (e) { 
            let elem = e.target;
            if (elem.scrollTop > 100 || doc.documentElement.scrollTop > 100) scrollToTopBtn.style.display = 'block';
            else { scrollToTopBtn.style.display = 'none'; }

        });
    }, 1000);
        
 
    scrollToTopBtn.addEventListener('click', topFunction);
    

}).call(this);

