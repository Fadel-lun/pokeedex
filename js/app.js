const pageSection = document.querySelector('#pokemons-list');
const input = document.getElementById('search');
const submit = document.getElementById('submit');
const page = document.querySelector('.page');
const modalBox = document.querySelector('.modal');


const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=200`;
let pokemons;


fetch(url)
    .then(res => {
        if(res.status != 200){
            console.log("the API not detected")
        }
        const a = Math.floor(Math.random() * 194);
        const b = a + 6;

        res.json().then(data => {
            pokemons = data.results;
            showPokemons = pokemons.slice(a, b);
            

            // console.log(a, b)
            console.log(showPokemons)

            getPokemons(showPokemons)

            
        })
    })

submit.addEventListener('click', () => {
    const keyword = input.value;
    const filterPokemon = pokemons.filter(n => {
        return n.name.toLowerCase().includes(keyword.toLowerCase())
    })
    const showPokemons = filterPokemon.slice(0, 11)

    
    if(filterPokemon.length){
        console.log(filterPokemon)
        getPokemons(showPokemons)
    }
    else{
        pageSection.firstElementChild.innerHTML = `<h2 class="mx-auto" style="color: white">Not found</h2>`;
    }
})


    const getUrl = () => {
        const nextUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${count}`;

        console.log(count)
    
            fetch(nextUrl).then(res => {
                res.json().then(data => {
                    let pokemons = data.results;
                    //  pokemons = filterPokemon;
                    
                    
                    getPokemons(pokemons)
                })
            })
    }
    

    const getPokemons = pokemons => {
        pageSection.firstElementChild.innerHTML = '';

        console.log(pokemons)

        pokemons.forEach(poke => {
            const pokemon = {
                name : poke.name, 
                url : poke.url 
                // gambar dari sumber lain
                // image : `https://pokeres.bastionbot.org/images/pokemon/${count++}.png`,
            }
            
            fetch(poke.url).then(res => res.json()).then(res => {
                pokemon ['image'] = res.sprites.front_default;
            //    console.log(pokemon.image)
                
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
            

        })

        

        
    }

    const getData = (url) => {
        // const image = `https://pokeres.bastionbot.org/images/pokemon/`;

        const modalHeader = modalBox.firstElementChild.firstElementChild.firstElementChild;
        const modalBody = modalBox.firstElementChild.firstElementChild.lastElementChild;

        [modalHeader.innerHTML, modalBody.innerHTML] = ['',''];
    

        fetch(url).then(res => res.json()).then(datas => {
            const dataPokemon = {};

            dataPokemon ['name'] = datas.name;
            dataPokemon ['id'] = datas.id;
            // dataPokemon ['image'] = datas.sprites.front_default;
            dataPokemon ['image'] = `https://pokeres.bastionbot.org/images/pokemon/${dataPokemon.id}.png`;
            dataPokemon ['height'] = datas.height;
            dataPokemon ['weight'] = datas.weight;
            dataPokemon ['types'] = datas.types.map(type => type.type.name)
            dataPokemon ['abilities'] = datas.abilities.map(ability => ability.ability.name).join('/');


            modalHeader.innerHTML = `
                <h4 class="modal-title" id="exampleModalLabel">${dataPokemon.id}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            `;

            modalBody.innerHTML = `
            <div class="container-img d-flex justify-content-center p-5">
                <img src="${dataPokemon.image}" class="mx-auto" style="width: 12rem;">                  
            </div>
            
            <div class="card-title d-flex justify-content-between">
                <h3 class="card-title text-capitalize">${dataPokemon.name}</h3>
                <h5 class="modal-title" id="exampleModalLabel">#${(dataPokemon.id > 9)? dataPokemon.id : '0'+dataPokemon.id}</h5>
            </div>
            <div class="row px-4 player-data">
                <div class="col col-4 data-container border-right">
                    <small class="mb-0">Height</small>
                    <p class="cp-text">${dataPokemon.height}</p>
                </div>
                <div class="col col-4  data-container border-right">
                    <small class="mb-0">Weight</small>
                    <p class="cp-text">${dataPokemon.weight}</p>
                </div>
                <div class="col col-4 data-container">
                    <small class="mb-0">Types</small>
                    <p class="cp-text text-capitalize">${dataPokemon.types}</p>
                </div>
                <div class="col data-container border-top">
                    <small class="mb-0">Abilities</small>
                    <p class="cp-text text-capitalize">${dataPokemon.abilities}</p>
                </div>
            </div>
            
            `
            console.log(dataPokemon.id)

        })
    }
