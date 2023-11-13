// DOM Elements
const form = document.getElementById('form')
const result = document.getElementById('image-container')
const more = document.getElementById('more')
const loading1 = document.getElementById('loading-1')
const loading2 = document.getElementById('loading-2')
const moreSection = document.getElementById('more-section')

// Variables
let page = 1

// Event Listeners
form.addEventListener('submit', (e) => {
	e.preventDefault()
	page = 1

	getImages(form.elements[0].value)
})

// Functions

const getImages = async (query) => {
	loading1.classList.remove('opacity-0')
	await fetch(
		`https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=${query}&client_id=${API_KEY}`
	)
		.then((res) => res.json())
		.then((results) => {
			if (results.results.length > 0) {
				moreSection.classList.remove('opacity-0')
			}

			renderImages(results.results)
			loading1.classList.add('opacity-0')
		})
		.catch((err) => console.log(err))
}

const renderImages = (results) => {
	if (page === 1) {
		result.innerHTML = ''
	}

	console.log(results)

	results.forEach((image) => {
		const div = document.createElement('div')
		const innerDiv = document.createElement('div')
		const subtext = document.createElement('a')

		innerDiv.innerHTML = `<div class="h-80 w-full overflow-hidden rounded-xl">
                                <img
                                    src="${image.urls.regular}"
                                    class="w-full rounded-xl h-64 md:h-80 object-cover hover:scale-105 transition duration-200 hover:opacity-95"
                                    alt="${image.alt_description}"
                                />
                                </div>`

		subtext.innerHTML = `<a href="${image.links.html}" class="cursor-pointer text-center block py-2 capitalize" target="_blank">
                                ${image.alt_description} <i class="fa-solid fa-arrow-up-right-from-square"></i
                                ></a>`

		div.appendChild(innerDiv)
		div.appendChild(subtext)

		result.appendChild(div)
	})

	page++
}
