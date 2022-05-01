import './styles/reset.css'
import './styles/style.scss'

const maxRowsOrColumns = 50
const maxPower = 30

const createTable = (countRows, countColumns, coordinates, power) => {
  const { horizontal, vertical } = coordinates
  const table = document.querySelector('table')
  table.innerHTML = ''

  const defaultColors = ['green', 'yellow', 'orange', 'red', 'darkred']
  const count = power - defaultColors.length
  const newColors = count > 0 ? new Array(count).fill(null).map(c => (c = getRandomColor())) : []
  const colors = ['', ...newColors, ...defaultColors]

  let currentRow = 0

  while (currentRow < countRows) {
    const row = new Array(countColumns).fill(0).map((cell, index) => {
      return `
        <td style="background: ${getColor({ currentColumn: index, currentRow, horizontal, vertical, power, colors })}">
          &nbsp;
        </td>
      `
    })

    currentRow++

    const rowHTML = document.createElement('tr')
    rowHTML.innerHTML = Array.from(row).join('')
    table.append(rowHTML)
  }
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

const handleApply = () => {
  const button = document.querySelector('button')

  button.addEventListener('click', () => {
    const countRowsElement = document.querySelector('.rows')
    const countColumnsElement = document.querySelector('.columns')
    const selectedRowElement = document.querySelector('.row')
    const selectedColumnElement = document.querySelector('.column')
    const power = document.querySelector('.power')

    const selectedRow = +selectedRowElement.value.replace(/\D+/g, '')
    const selectedColumn = +selectedColumnElement.value.replace(/\D+/g, '')
    const countRows = +countRowsElement.value.replace(/\D+/g, '')
    const countColumns = +countColumnsElement.value.replace(/\D+/g, '')
    const powerValue = +power.value.replace(/\D+/g, '')

    if (
      !countRows ||
      !countColumns ||
      countRows > maxRowsOrColumns ||
      countColumns > maxRowsOrColumns ||
      !selectedRow ||
      !selectedColumn ||
      !powerValue ||
      powerValue > maxPower
    ) {
      return
    }

    createTable(countRows, countColumns, { vertical: selectedColumn - 1, horizontal: selectedRow - 1 }, powerValue)

    countRowsElement.value = ''
    countColumnsElement.value = ''
    selectedRowElement.value = ''
    selectedColumnElement.value = ''
    power.value = ''
  })
}

window.addEventListener('DOMContentLoaded', () => {
  handleApply()
})
