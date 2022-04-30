import './styles/reset.css'
import './styles/style.scss'

const max = 30

const createTable = (countRows, countColumns, coordinates) => {
  const { horizontal, vertical } = coordinates
  const table = document.querySelector('table')
  table.innerHTML = ''

  let currentRow = 0

  while (currentRow < countRows) {
    const row = new Array(countColumns).fill(0).map((cell, index) => {
      return `
        <td class=${currentRow === horizontal - 1 && index === vertical - 1 ? 'power_1' : ''}>
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

const selectCell = () => {}

const handleApply = () => {
  const button = document.querySelector('button')

  button.addEventListener('click', () => {
    const rows = document.querySelector('.rows')
    const columns = document.querySelector('.columns')
    const row = document.querySelector('.row')
    const column = document.querySelector('.column')

    const rowValue = row.value.replace(/\D+/g, '')
    const columnValue = column.value.replace(/\D+/g, '')
    const rowsValue = rows.value.replace(/\D+/g, '')
    const columnsValue = columns.value.replace(/\D+/g, '')

    if (!rowsValue || !columnsValue || rowsValue > max || !columnsValue > max || !rowValue || !columnValue) return

    createTable(+rowsValue, +columnsValue, { vertical: +columnValue, horizontal: +rowValue })

    rows.value = ''
    columns.value = ''
    row.value = ''
    column.value = ''
  })
}

window.addEventListener('DOMContentLoaded', () => {
  handleApply()
})
