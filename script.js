// =============================================================
// 2.04 Juniper & Grain Menu
// Paste your /exec web address from the Setup Guide below.
// Write the rest of the JavaScript yourself.
// =============================================================

const API =
  'https://script.google.com/macros/s/AKfycbwXROpVONbwGyXE_9OggCYznSzMSWdmvajZ4JmQVQFq8ysqLrsloKBpvd4NBo6dZESyzA/exec'

const statusMessage = document.getElementById('status')
const menuContainer = document.getElementById('menu')
const filterContainer = document.getElementById('filters')

let allItems = []

// 1. async function loadMenu()
//    fetch the API, check response.ok, return the JSON.

async function loadMenu () {
  const response = await fetch(API)

  if (!response.ok) {
    throw new Error('HTTP' + response.status)
  }

  const items = await response.json()
  return items
}

// 2. async function startMenu()
//    Show a loading message. In try: load the menu, build the
//    buttons, show every item. In catch: show a friendly error.

async function startMenu () {
  statusMessage.textContent = 'Loading the Menu.....'

  try {
    allItems = await loadMenu()
    buildFilters()
    showMenu('All')
    statusMessage.textContent = ''
  } catch (error) {
    statusMessage.textContent =
      "Sorry, the menu didn't load. Please call us at (732) 555-0187."
    console.log(error)
  }
}

//Get Categories
function getCategories () {
  console.log('getCats')
  let categories = []

  allItems.forEach(function (item) {
    if (!categories.includes(item.category)) {
      categories.push(item.category)
    }
  })
  return categories
}

//build cards
function makeCard (item) {
  console.log('made card runnin')
  const garlandId = `card-garland-${allItems.indexOf(item)}`
  let cardClass = 'card'
  let badge = ''
  let soldText = ''
  let tagsHTML = ''

  if (item.popular) {
    badge = `<span class="badge">Popular</span>`
  }
  if (item.soldOut) {
    cardClass = 'card is-sold'
    soldText = `<p class="sold">Sold out</p>`
  }

  item.tags.forEach(function (tag) {
    tagsHTML += `<li>${tag}</li>`
  })

  return `  
    <article class="${cardClass}">
      <svg class="card-garland" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <path id="${garlandId}-leaf" d="M0 0 C7 -9 18 -10 25 -4 C22 5 11 10 0 0Z"/>
          <pattern id="${garlandId}-horizontal" width="76" height="38" patternUnits="userSpaceOnUse">
            <path d="M-8 34 C12 28 17 11 36 8 C55 5 62 21 84 30" fill="none" stroke="#173d32" stroke-width="7"/>
            <path d="M-8 34 C12 28 17 11 36 8 C55 5 62 21 84 30" fill="none" stroke="#50775a" stroke-width="4"/>
            <use href="#${garlandId}-leaf" fill="#315f43" stroke="#173d32" stroke-width="1" transform="translate(1 28) rotate(-34)"/>
            <use href="#${garlandId}-leaf" fill="#66865a" stroke="#244b38" stroke-width="1" transform="translate(12 17) rotate(148) scale(.84)"/>
            <use href="#${garlandId}-leaf" fill="#315f43" stroke="#173d32" stroke-width="1" transform="translate(27 11) rotate(-28)"/>
            <use href="#${garlandId}-leaf" fill="#66865a" stroke="#244b38" stroke-width="1" transform="translate(43 11) rotate(151) scale(.85)"/>
            <use href="#${garlandId}-leaf" fill="#315f43" stroke="#173d32" stroke-width="1" transform="translate(58 20) rotate(-30)"/>
            <use href="#${garlandId}-leaf" fill="#66865a" stroke="#244b38" stroke-width="1" transform="translate(68 29) rotate(145) scale(.82)"/>
            <circle cx="8" cy="24" r="3.8" fill="#a63d43" stroke="#772e39" stroke-width="1"/>
            <circle cx="37" cy="9" r="3.8" fill="#a63d43" stroke="#772e39" stroke-width="1"/>
            <circle cx="63" cy="22" r="3.2" fill="#a63d43" stroke="#772e39" stroke-width="1"/>
            <circle cx="47" cy="15" r="2" fill="#e1c477"/>
          </pattern>
          <pattern id="${garlandId}-vertical" width="42" height="76" patternUnits="userSpaceOnUse">
            <path d="M34 -8 C27 12 10 17 8 36 C6 55 23 62 31 84" fill="none" stroke="#173d32" stroke-width="7"/>
            <path d="M34 -8 C27 12 10 17 8 36 C6 55 23 62 31 84" fill="none" stroke="#50775a" stroke-width="4"/>
            <use href="#${garlandId}-leaf" fill="#66865a" stroke="#244b38" stroke-width="1" transform="translate(17 -5) rotate(232) scale(.84)"/>
            <use href="#${garlandId}-leaf" fill="#315f43" stroke="#173d32" stroke-width="1" transform="translate(18 5) rotate(52)"/>
            <use href="#${garlandId}-leaf" fill="#66865a" stroke="#244b38" stroke-width="1" transform="translate(12 16) rotate(235) scale(.84)"/>
            <use href="#${garlandId}-leaf" fill="#315f43" stroke="#173d32" stroke-width="1" transform="translate(10 27) rotate(54)"/>
            <use href="#${garlandId}-leaf" fill="#66865a" stroke="#244b38" stroke-width="1" transform="translate(12 38) rotate(232) scale(.84)"/>
            <use href="#${garlandId}-leaf" fill="#315f43" stroke="#173d32" stroke-width="1" transform="translate(15 49) rotate(48)"/>
            <use href="#${garlandId}-leaf" fill="#66865a" stroke="#244b38" stroke-width="1" transform="translate(8 60) rotate(235) scale(.84)"/>
            <use href="#${garlandId}-leaf" fill="#315f43" stroke="#173d32" stroke-width="1" transform="translate(19 69) rotate(52)"/>
            <circle cx="28" cy="9" r="3.8" fill="#a63d43" stroke="#772e39" stroke-width="1"/>
            <circle cx="10" cy="39" r="3.8" fill="#a63d43" stroke="#772e39" stroke-width="1"/>
            <circle cx="25" cy="64" r="3.2" fill="#a63d43" stroke="#772e39" stroke-width="1"/>
          </pattern>
          <mask id="${garlandId}-corners">
            <rect width="400" height="600" rx="28" fill="white"/>
          </mask>
        </defs>
        <g mask="url(#${garlandId}-corners)">
          <rect width="400" height="30" fill="url(#${garlandId}-horizontal)"/>
          <rect y="570" width="400" height="30" fill="url(#${garlandId}-horizontal)"/>
          <rect y="30" width="42" height="540" fill="url(#${garlandId}-vertical)"/>
          <rect x="358" y="30" width="42" height="540" fill="url(#${garlandId}-vertical)" transform="translate(758 0) scale(-1 1)"/>
        </g>
      </svg>
      <img src="${item.image}" alt="${item.name}">
      ${badge}
      <div class="card-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <ul class="tags">${tagsHTML}</ul>
        <p class="price">$${item.price.toFixed(2)}</p>
        ${soldText}
      </div>
    </article>`
}

// 3. function showMenu(items)
//    One heading per category, then a card for each item:
//    photo, name, description, price, popular badge, tags, sold out.
function showMenu (chosen) {
  let menuHTML = ''

  getCategories().forEach(function (category) {
    if (chosen === 'All' || chosen === category) {
      let cardsHTML = ''

      allItems.forEach(function (item) {
        if (item.category === category) {
          cardsHTML += makeCard(item)
        }
      })
      menuHTML += `<h2>${category}</h2><div class="grid">${cardsHTML}</div>`
    }
  })
  menuContainer.innerHTML = menuHTML
}

// 4. function buildFilters(items)
//    One "All" button, plus one button per category in the data.
//    A click shows only that category's items.
function buildFilters () {
  let buttonsHTML = `<button class="active">All</button>`

  getCategories().forEach(function (category) {
    buttonsHTML += `<button>${category}</button>`
  })

  filterContainer.innerHTML = buttonsHTML
  // Give every button a click listener.
  const buttons = filterContainer.querySelectorAll('button')

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Move the "active" style to the clicked button.
      buttons.forEach(function (otherButton) {
        otherButton.classList.remove('active')
      })
      button.classList.add('active')

      // The button's text is the category name.
      showMenu(button.textContent)
    })
  })
}

// 5. Call startMenu() when the page opens.
startMenu()