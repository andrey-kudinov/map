import './styles/reset.css'
import './styles/style.scss'

const rows = 200
const columns = 200
const size = 0.1
const defaultColors = ['#49b600', '#c7dd00', 'yellow', '#ffd900', 'orange', '#d65600', '#df0000', 'darkred']
const maxPower = 15

const createTable = ({ rows, columns }) => {
  const table = document.querySelector('table')
  table.innerHTML = ''
  let currentRow = 0

  while (currentRow < rows) {
    const row = new Array(columns).fill(0).map(cell => `<td style="width: ${size}rem; height: ${size}rem"></td>`)
    const rowHTML = document.createElement('tr')
    rowHTML.innerHTML = Array.from(row).join('')

    table.append(rowHTML)

    currentRow++
  }
}

const createColors = (defaultColors, power) => {
  const count = power - defaultColors.length
  const newColors = count > 0 ? new Array(count).fill(null).map(c => (c = createRandomColor())) : []
  return ['', ...newColors, ...defaultColors]
}

const createRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

const createCircles = (colors, power) => {
  let currentCircle = 0

  const cells = document.querySelectorAll('td')
  const centerCell = cells[generateRandomInteger(rows) * generateRandomInteger(columns) - 1]

  const circles = document.querySelectorAll('.circle')
  if (circles?.length) circles.forEach(circle => circle.remove())

  while (currentCircle <= power) {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const dimension = `${size + 2 * size * currentCircle}rem`
    circle.style.width = dimension
    circle.style.height = dimension
    circle.style.background = colors[colors.length - 1 - currentCircle]
    circle.style.zIndex = colors.length - currentCircle + 1

    centerCell.append(circle)

    currentCircle++
  }
}

const generateRandomInteger = max => Math.floor(Math.random() * max) + 1

const setCircles = () => {
  const power = generateRandomInteger(maxPower)
  const colors = createColors(defaultColors, power)
  createCircles(colors, power)
}

window.addEventListener('DOMContentLoaded', () => {
  createTable({ rows, columns })
  setInterval(setCircles, 500)
})
