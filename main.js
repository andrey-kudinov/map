import './styles/reset.css'
import './styles/style.scss'

const max = 30

const createTable = (countRows, countColumns, coordinates, power) => {
  const { horizontal, vertical } = coordinates
  const table = document.querySelector('table')
  table.innerHTML = ''

  let currentRow = 0

  while (currentRow < countRows) {
    const row = new Array(countColumns).fill(0).map((cell, index) => {
      return `
        <td class=${getCellClass(index, currentRow, horizontal, vertical, power)}>
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

const getPowerClass = power =>
  power === 1
    ? 'power_1'
    : power === 2
    ? 'power_2'
    : power === 3
    ? 'power_3'
    : power === 4
    ? 'power_4'
    : power === 5
    ? 'power_5'
    : ''

const getCellClass = (currentColumn, currentRow, horizontal, vertical, power) => {
  return currentRow === horizontal && currentColumn === vertical // center
    ? getPowerClass(power)
    : (currentRow === horizontal - 1 && currentColumn === vertical) || // left
      (currentRow === horizontal + 1 && currentColumn === vertical) || // right
      (currentRow === horizontal && currentColumn === vertical - 1) || // bottom
      (currentRow === horizontal && currentColumn === vertical + 1) || // top
      (currentRow === horizontal - 1 && currentColumn === vertical - 1) || // left bottom
      (currentRow === horizontal + 1 && currentColumn === vertical - 1) || // right bottom
      (currentRow === horizontal - 1 && currentColumn === vertical + 1) || // left top
      (currentRow === horizontal + 1 && currentColumn === vertical + 1) // right top
    ? getPowerClass(power - 1)
    : (currentRow === horizontal - 2 && currentColumn === vertical) || // left - 1
      (currentRow === horizontal + 2 && currentColumn === vertical) || // right + 1
      (currentRow === horizontal && currentColumn === vertical - 2) || // bottom - 1
      (currentRow === horizontal && currentColumn === vertical + 2) || // top + 1
      (currentRow === horizontal - 2 && currentColumn === vertical - 1) || // left - 2 bottom - 1
      (currentRow === horizontal - 1 && currentColumn === vertical - 2) || // left - 1 bottom - 2
      (currentRow === horizontal - 2 && currentColumn === vertical - 2) || // left - 2 bottom - 2
      (currentRow === horizontal + 2 && currentColumn === vertical - 1) || // right + 2 bottom - 1
      (currentRow === horizontal + 1 && currentColumn === vertical - 2) || // right + 1 bottom - 2
      (currentRow === horizontal + 2 && currentColumn === vertical - 2) || // right + 2 bottom - 2
      (currentRow === horizontal - 2 && currentColumn === vertical + 1) || // left - 2 top + 1
      (currentRow === horizontal - 1 && currentColumn === vertical + 2) || // left - 1 top + 2
      (currentRow === horizontal - 2 && currentColumn === vertical + 2) || // left - 2 top + 2
      (currentRow === horizontal + 2 && currentColumn === vertical + 1) || // right + 2 top + 1
      (currentRow === horizontal + 1 && currentColumn === vertical + 2) || // right + 1 top + 2
      (currentRow === horizontal + 2 && currentColumn === vertical + 2) // right + 2 top + 2
    ? getPowerClass(power - 2)
    : ''
}

const handleApply = () => {
  const button = document.querySelector('button')

  button.addEventListener('click', () => {
    const rows = document.querySelector('.rows')
    const columns = document.querySelector('.columns')
    const row = document.querySelector('.row')
    const column = document.querySelector('.column')
    const power = document.querySelector('.power')

    const rowValue = row.value.replace(/\D+/g, '')
    const columnValue = column.value.replace(/\D+/g, '')
    const rowsValue = rows.value.replace(/\D+/g, '')
    const columnsValue = columns.value.replace(/\D+/g, '')
    const powerValue = power.value.replace(/\D+/g, '')

    if (!rowsValue || !columnsValue || rowsValue > max || !columnsValue > max || !rowValue || !columnValue || !power)
      return

    createTable(+rowsValue, +columnsValue, { vertical: +columnValue - 1, horizontal: +rowValue - 1 }, +powerValue)

    rows.value = ''
    columns.value = ''
    row.value = ''
    column.value = ''
    power.value = ''
  })
}

window.addEventListener('DOMContentLoaded', () => {
  handleApply()
})
