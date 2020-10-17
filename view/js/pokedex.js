var request = new XMLHttpRequest()
request.open('GET', 'http://localhost:8181/pokedex', true)
request.onload = function(){
	var data = JSON.parse(this.response)
	data.forEach((pokemon) => {
		
		// Get the root element for the pokedex
		const pokedex = document.getElementById('pokedex')

		// Container to hold each pokemon in the pokedex
		const entry = document.createElement('li')
		entry.setAttribute('class', 'entry')

		// Element to store the picture off each pokemon
		const img = document.createElement('img')
		img.setAttribute('class', 'pokemonImg')
		img.src = pokemon.strimagepath

		// Text for each pokemon entry
		const info = document.createElement('p')
		info.setAttribute('class','pokemonText')
		info.textContent = '#' + pokemon.intpokemonid + '			' + pokemon.strpokemonname

		// Organize the elements
		pokedex.appendChild(entry)
		entry.appendChild(img)
		entry.appendChild(info)

	})
}
request.send()
console.log("Request sent")