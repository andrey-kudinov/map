import './styles/reset.css'
import './styles/style.scss'

const rows = 200
const columns = 200
const size = 0.1
const defaultColors = [
  '#0068df',
  '#007bdf',
  '#0095df',
  '#00a4df',
  '#00badf',
  '#00d4df',
  '#00dfc1',
  '#00dfab',
  '#00df8a',
  '#00df73',
  '#00df55',
  '#00df0f',
  '#30df00',
  '#7bdf00',
  '#9cdf00',
  '#b6df00',
  '#d8df00',
  '#dfd400',
  '#dfb600',
  '#dfa400',
  '#df9800',
  '#df8800',
  '#df6800',
  '#df4700',
  '#df3b00',
  '#df2100',
  '#df0000',
  '#c40000',
  '#a60202',
  'darkred'
]
const maxPower = 30

const createTable = ({ rows, columns }) => {
  const table = document.querySelector('table')
  table.innerHTML = ''
  let currentRow = 0

  while (currentRow < rows) {
    const row = new Array(columns).fill(`<td style="width: ${size}rem; height: ${size}rem"></td>`)
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

const createCircles = ({ colors, power, x, y }) => {
  let currentCircle = 0
  const cells = document.querySelectorAll('td')
  const selectedCell = cells[((y - 1) * columns) + x - 1]
  const circles = document.querySelectorAll('.circle')

  if (circles?.length) circles.forEach(circle => circle.remove())

  while (currentCircle <= power) {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const dimension = `${size + 2 * size * currentCircle}rem`
    circle.style.width = dimension
    circle.style.height = dimension
    circle.style.background = colors[colors.length - 1 - currentCircle]
    circle.style.zIndex = colors.length - currentCircle

    selectedCell.append(circle)
    currentCircle++
  }
}

const generateRandomInteger = max => Math.floor(Math.random() * max) + 1

const setCircles = () => {
  const power = generateRandomInteger(maxPower)
  const colors = createColors(defaultColors, power)
  createCircles({ colors, power, x: generateRandomInteger(columns), y: generateRandomInteger(rows) })
}

window.addEventListener('DOMContentLoaded', () => {
  createTable({ rows, columns })
  setInterval(setCircles, 500)
})
