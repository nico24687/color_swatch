import './stylesheets/styles.scss'
import COLORS from './data/colors'
import $ from 'jquery'

$(document).ready(() => {
  getTopColor()
    .then(topColor => {
      $(".top-color").text(`${topColor.value} (${topColor.color_count})`)
    })

  $("button").on("click", () => {
    generateSwatches()
  })

  $('textarea').keypress((e) => {
   if(e.which === 13){
     e.preventDefault()
     generateSwatches(0)
   }
  })
})


const getTopColor = () => {
  return fetch("https://color-swatch-api.herokuapp.com/api/v1/top_color")
    .then(response => response.json())
}

const buildSwatch = (color) => {
  return `<div class="swatch" style="background-color:${COLORS[color]};"></div>`
}

const getUniqueColors = (nonUniqueColors) => {
  return [...new Set(nonUniqueColors)]
}

const getNonUniqueColors = (input) => {
  return input.toLowerCase().split(" ")
    .filter(word => COLORS[word])
    
}



const postColor = (color) => {
  fetch("https://color-swatch-api.herokuapp.com/api/v1/colors", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ color: { value: color } })
  })
}

const generateSwatches = () => {
  const nonUniqueColors = getNonUniqueColors($('textarea').val())

  nonUniqueColors.forEach(color => postColor(color))

  getUniqueColors(nonUniqueColors)
    .map(color => $('.colorized-text').append(buildSwatch(color)))
}










// As a user
// when I visit Color Swatch
// and paste a paragraph into the "Paste text here" textarea
// and I click "Colorize!"
// Then I should see a swatch for each unique color from the paragraph that matches the colors in `lib/data/colors.js`.
// I should not see duplicate color swatches even if the color appeared multiple times in the paragraph.
// Each color swatch should have a background color of its text's correlating hex code,
// e.g., "red" => `<div class="swatch" style="background-color:#FF0000;"></div>`


// For story 2,
// each invidivual color parsed should be sent via POST request(including duplicates)
// to the Color Swatch API.