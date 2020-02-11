async function initiatePokemon() {
    let resp = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=964');
    let pokemons = resp.data.results;
    
    r1 = Math.floor(Math.random() * Math.floor(964));
    r2 = r1 < 3 ? r1 + 3 : r1 - 3;
    r3 = r1 < 3 ? r2 + 3 : r2 - 3;
    let resp1 = axios.get(pokemons[r1].url);
    let resp2 = axios.get(pokemons[r2].url);
    let resp3 = axios.get(pokemons[r3].url);
    
    let pokemonPromise = await Promise.all(
        [resp1, resp2, resp3]
    );
    let pokes = [];
    for (p in pokemonPromise) {
        pokes.push(pokemonPromise[p].data);
    }
    let spec1 = axios.get(pokes[0].species.url);
    let spec2 = axios.get(pokes[1].species.url);
    let spec3 = axios.get(pokes[2].species.url);
    
    let speciesPromise = await Promise.all(
        [spec1, spec2, spec3]
    );

    let species = []
    for (let i = 0; i < speciesPromise.length; i++) {
        species.push(speciesPromise[i].data);
        let text = ""
        for (entry of speciesPromise[i].data.flavor_text_entries){
            if (entry.language.name === "en"){
                text = entry.flavor_text
            }
        }
        if (i === 0)
        console.log(`${pokemons[r1].name}: ${text}`)
        if (i === 1)
        console.log(`${pokemons[r2].name}: ${text}`)
        if (i === 2)
        console.log(`${pokemons[r3].name}: ${text}`)
    }



    //console.log(pokemonPromise)
    
}

window.onload = async function(){
    await initiatePokemon()
}