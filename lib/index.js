import './stylesheets/styles.scss'
import COLORS from './data/colors'
import $ from 'jquery'

$(document).ready(() => {
  getTopColor()
    .then(topColor => {
      $(".top-color").text(`${topColor.value} (${topColor.color_count})`)
    })
})


const getTopColor = () => {
  return fetch("https://color-swatch-api.herokuapp.com/api/v1/top_color")
    .then(response => response.json())
}