import './styles/reset.css'
import './styles/style.scss'

const rows = 30
const columns = 30
const size = 2
const defaultColors = ['#49b600', '#c7dd00', 'yellow', '#ffd900', 'orange', '#d65600', '#df0000', 'darkred']

const createTable = ({ rows, columns, coordinates, power, colors }) => {
  const { horizontal, vertical } = coordinates
  const table = document.querySelector('table')
  table.innerHTML = ''

  let currentRow = 0

  while (currentRow < rows) {
    const row = new Array(columns).fill(0).map((cell, index) => (
      `
        <td
          style="width: ${size}rem; height: ${size}rem"
          data-center=${currentRow === horizontal && index === vertical}
        >
        </td>
      `
    ))

    currentRow++

    const rowHTML = document.createElement('tr')
    rowHTML.innerHTML = Array.from(row).join('')
    table.append(rowHTML)
  }

  createCircles(colors, power)
}

const createColors = (defaultColors, power) => {
  const count = power - defaultColors.length
  const newColors = count > 0 ? new Array(count).fill(null).map(c => (c = getRandomColor())) : []
  return ['', ...newColors, ...defaultColors]
}

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

const getColor = ({ currentColumn, currentRow, horizontal, vertical, power, colors }) => {
  let color = ''
  let step = power

  const setColor = n => {
    if (
      currentRow >= horizontal - n &&
      currentRow <= horizontal + n &&
      currentColumn >= vertical - n &&
      currentColumn <= vertical + n
    ) {
      color = colors[power - n]
    }
  }

  while (step > 0) {
    setColor(step)
    step--
  }

  if (currentRow === horizontal && currentColumn === vertical) color = colors[power]

  return color
}

const createCircles = (colors, power) => {
  let currentCircle = 0
  const centerCell = document.querySelector('[data-center="true"]')

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

const init = () => {
  const power = generateRandomInteger(15)
  const colors = createColors(defaultColors, power)
  createTable({
    rows,
    columns,
    power,
    colors,
    coordinates: { horizontal: generateRandomInteger(columns) - 1, vertical: generateRandomInteger(rows) - 1 },
  })
}

window.addEventListener('DOMContentLoaded', () => {
  setInterval(init, 500)
})
