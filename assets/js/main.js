import findCuisineKeyInMap from './imageFinder.js';

( function() {
    'use strict';

    document.addEventListener('readystatechange', function (e) {
        let state = this.readyState,
            modal = document.querySelector('.Vw-Vh-100');
        
        if (state == 'complete') setTimeout(function() { 
            if(modal) modal.style.display = 'none'; },1000);

    });

})();


( function() {
    'use strict';

    const body = document.body,
            doc = document,
            win = document.window,
            myForm = doc.querySelector( '#submit-form' ),
            submitBtn = doc.querySelector( '#submitBtn' ),
            locationInputField = doc.querySelector('#location'),
            query = doc.querySelector('#restaurant-name'),
            scrollToTopBtn = doc.querySelector('#topbtn'),
            navbtn = doc.querySelector('.navbar-toggler'),
            navCollapse = doc.querySelector('.navbar-collapse'),
            popularSearch = doc.querySelector('#popular-search');



        const createElem = function (elem) {
            if (typeof elem !== 'string') return; 
            else { return doc.createElement(elem); }
        };


        if(popularSearch) {
            popularSearch.addEventListener( 'click', function(e) {
                let tar = e.target;
                let badgeLink = tar.className.includes('btn'),
                city = this.getAttribute('data-city') || 'orlando';
                
                if( 'click' == e.type && badgeLink ) {
                    locationInputField.value = city;
                    query.value = tar.textContent;
                    myForm.requestSubmit(submitBtn);
                    submitBtn.removeAttribute('disabled');
                }
            });
        }
        

        if(myForm) {
            myForm.addEventListener('keyup', function(e) {
                if ( query.value.trim() && locationInputField.value.trim()) submitBtn.removeAttribute('disabled');
                else { submitBtn.setAttribute('disabled', ''); }
            });
        }
 

        if(myForm){
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
                    populateSearchData( data.restaurants );
                }catch (err) {
                    console.error(`${ err }`);
                }
                
            });
        }
                        

        const populateSearchData = (data) => {

            const container = document.querySelector('.results');

            if (data.length < 1) {
                let nothingFound = createElem('div'),
                p = createElem('p');

                nothingFound.classList.add('d-flex', 'justify-content-center');
                p.classList.add( 'p-3', 'text-black-50' ,'__08em');

                p.textContent = 'nothing found | try select one of the options above ';

                nothingFound.append(p);
                container.appendChild(nothingFound);

            } else {
                data.forEach(function (r, i) {

                    if ('content' in document.createElement('template')) {

                        const template = document.querySelector('#productrow'),
                            clone = template.content.cloneNode(true),
                            image = clone.querySelector('.__card-img'),
                            title = clone.querySelector('.info .__card-title'),
                            location = clone.querySelector('.info .card-text'),
                            city = clone.querySelector('.info .city'),
                            rate = clone.querySelector('.rate'),
                            button = clone.querySelector('.block-link');


                        image.setAttribute('width', 80);
                        image.setAttribute('height', 80);

                        image.srcset = r.thumbnail || findCuisineKeyInMap(r.type);
                        title.textContent = r.name;
                        location.textContent = r.location.address;
                        city.textContent = r.location.city;
                        rate.innerHTML = `&#9734; ${r.user_rating}`;
                        button.href = r.url;

                        setTimeout(() => container.appendChild(clone), i * 100);

                    }
                });
            }


        };


    
    const topFunction = function() {
        doc.querySelector('.__brand').scrollIntoView({ behavior: 'smooth' });
    };


        
    if(scrollToTopBtn) {

        setTimeout(() => {
            doc.body.addEventListener('scroll', function (e) { 
                let elem = e.target;
                if (elem.scrollTop > 100 || doc.documentElement.scrollTop > 100) scrollToTopBtn.style.display = 'block';
                else { scrollToTopBtn.style.display = 'none'; }
            });
        }, 1000);

        scrollToTopBtn.addEventListener('click', topFunction);
    }


    if(navbtn) {
        let toggled = false;
        navbtn.addEventListener('click', function(e) {
            let click = 'click',
                evtType = e.type;

            if(toggled == false && click == evtType) {
                navCollapse.style.display = 'block';
                toggled =  true;
            }else{
                navCollapse.removeAttribute('style');
                toggled =  false;
            } 
        });
    }

}).call(this);


