

start()


/* functions */
function start() {
	// Grab the grid to hold the pokedex entries
	const pokedex = document.getElementById('pokedex-grid')

	// Make AJAX request to web server
	let request = new XMLHttpRequest()
	request.open('GET', 'http://localhost:8181/pokedex', true)
	request.onload = function(){
		let data = JSON.parse(this.response)
		data.forEach((pokemon) => {

			// Container to hold each pokemon in the pokedex
			const entry = document.createElement('div')
			entry.setAttribute('class', 'pokedex-entry')

			// Element to store the picture of each pokemon
			const img = document.createElement('img')
			img.setAttribute('class', 'entry-img')
			img.src = pokemon.strimagepath

			// ID of the pokemon
			const id = document.createElement('p')
			id.setAttribute('class','entry-id')
			id.textContent = pokemon.intpokemonid

			// Name of the pokemon
			const name = document.createElement('p')
			name.setAttribute('class','entry-name')
			name.textContent = pokemon.strpokemonname

			//Make div clickable
			const link = document.createElement('a')
			link.setAttribute('class', 'entry-link')
			link.setAttribute('onClick', 'pokemonClickListener(this)')

			// Organize the elements
			pokedex.appendChild(entry)
			entry.appendChild(img)
			entry.appendChild(id)
			entry.appendChild(name)
			entry.appendChild(link)

		})
	}
	request.send()
}

function pokedexSearch() { 
	let entries = document.getElementById('pokedex-grid').getElementsByTagName('div')
	let filter = document.getElementById('search').value.toLowerCase()
	for(let i = 0; i < entries.length; i++) {
		let id = entries[i].getElementsByTagName('p')[0].textContent
		let name = entries[i].getElementsByTagName('p')[1].textContent
		if(id != filter && !name.toLowerCase().includes(filter)) {
			entries[i].style.display = 'none';
		} else {
			entries[i].style.display = '';
		}
	}	
}


function pokemonClickListener(entryLink) {
	const entry = entryLink.parentElement
	console.log(entry)
	//let detailsPane = document.getElementById('pokemon-details')
	// Create new div that will show details about selected pokemon
	//let pokemonInfoPane = document.createElement('div')
	//pokemonInfoPane.appendChild(entry)
	//pokemonInfoPane.setAttribute('id', 'entry-details')
	//detailsPane.appendChild(pokemonInfoPane)
	//detailsPane.style.display = ''
}