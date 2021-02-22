const pageSection = document.querySelector('#pokemons-list');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const page = document.querySelector('.page');
const modalBox = document.querySelector('.modal')
let count = 1;
let key = 0;

const url = `https://pokeapi.co/api/v2/pokemon?offset=${key}&limit=30`;


fetch(url)
    .then(res => {
        if(res.status != 200){
            console.log("the API not detected")
        }

        res.json().then(data => {
            const pokemons = data.results;

            getPokemons(pokemons)
        })
    })

    rightArrow.addEventListener('click', function(){
        let pageNumber = parseInt(page.innerText);
        
        page.innerText = (pageNumber == 15)? 1 : ++pageNumber;
        key = ( key > 420)? 0 : key +=30; 

        count = (count > 450)?  1 : count ;

        getUrl(key, count)
    })

    leftArrow.addEventListener('click', function(){
        let pageNumber = parseInt(page.innerText);
        page.innerText = (pageNumber == 1)? 15 : --pageNumber;
            
        key = ( key < 30)? 450 : key -=30; 

        count = (count <= 40)? 421 : count-=60;

        getUrl()
    });


    const getUrl = () => {
        const nextUrl = `https://pokeapi.co/api/v2/pokemon?offset=${key}&limit=30`;

        console.log(count)
    
            fetch(nextUrl).then(res => {
                res.json().then(data => {
                    const pokemons = data.results;
                    
                    
    
                    getPokemons(pokemons)
                })
            })
    }
    

    const getPokemons = pokemons => {
        pageSection.firstElementChild.innerHTML = '';


        pokemons.forEach(poke => {
            const pokemon = {
                name : poke.name, 
                image : `https://pokeres.bastionbot.org/images/pokemon/${count++}.png`,
                url : poke.url 
            }
            
            
            pageSection.firstElementChild.innerHTML += `
                <div class="col col-lg-4 col-md-6">
                        <div class="card my-3 mx-auto bg-secondary border-3 text-center text-capitalize ">
                        <div class="container-img" data-toggle="modal" data-target="#dataPokemonModal" >
                            <img src="${pokemon.image}" onclick=getData("${pokemon.url}")>
                        </div>
                            <h3 class="title">${pokemon.name}</h3>
                    </div>

                </div>
            `

        })

        

        
    }

    const getData = (url) => {

        const modalHeader = modalBox.firstElementChild.firstElementChild.firstElementChild;
        const modalBody = modalBox.firstElementChild.firstElementChild.lastElementChild;

        [modalHeader.innerHTML, modalBody.innerHTML] = ['',''];
    

        fetch(url).then(res => res.json()).then(datas => {
            const dataPokemon = {};

            dataPokemon ['image'] = datas.sprites.front_default;
            dataPokemon ['name'] = datas.name;
            dataPokemon ['id'] = datas.id
            dataPokemon ['types'] = datas.types.map(type => type.type.name)
            dataPokemon ['abilities'] = datas.abilities.map(ability => ability.ability.name);


            modalHeader.innerHTML = `
                <h4 class="modal-title" id="exampleModalLabel">${dataPokemon.id}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            `;

            modalBody.innerHTML = `
                <div class="container-img d-flex justify-content-center">
                      <img src="${dataPokemon.image}" class="mx-auto" style="width: 19rem;">                  
                   </div>
                   
                   <h3 class="card-title">${dataPokemon.name}</h3>
                   <p>Types : ${dataPokemon.types}</p>
                   <p>Abilities ${dataPokemon.abilities}</p>
                
                  
            `
            console.log(dataPokemon.id)
        })
    }
