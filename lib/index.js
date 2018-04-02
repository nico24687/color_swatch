import './stylesheets/styles.scss'
import COLORS from './data/colors'
import $ from 'jquery'

$(document).ready(() => {
  getTopColor()
    .then(topColor => {
      $(".top-color").text(`${topColor.value} (${topColor.color_count})`)
    })

  $("button").on("click", () => {
    $(".colorized-text").html("")

    getUniqueColors($("textarea").val()).forEach(color => {$(".colorized-text").append(generateSwatchNode(color))})
  })
})


const getTopColor = () => {
  return fetch("https://color-swatch-api.herokuapp.com/api/v1/top_color")
    .then(response => response.json())
}

const getUniqueColors = (string) => {
  const allWords = string.toLowerCase().trim().split(" ")
  const allColors = allWords.filter(word => COLORS[word])
  const uniqueColors = [...new Set(allColors)]
  return uniqueColors
}

const generateSwatchNode = (color) => {
  return `<div class="swatch" style="background-color:${COLORS[color]};"></div>` 
}







// As a user
// when I visit Color Swatch
// and paste a paragraph into the "Paste text here" textarea
// and I click "Colorize!"
// Then I should see a swatch for each unique color from the paragraph that matches the colors in `lib/data/colors.js`.
// I should not see duplicate color swatches even if the color appeared multiple times in the paragraph.
// Each color swatch should have a background color of its text's correlating hex code,
// e.g., "red" => `<div class="swatch" style="background-color:#FF0000;"></div>`