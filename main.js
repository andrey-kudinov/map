import './styles/reset.css'
import './styles/style.scss'

const data = [
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
]

const createTable = () => {
  const table = document.querySelector('table')

  data.forEach(d => {
    const row = d.map(r => {
      return `
        <td>
          &nbsp;
        <input
          id=''
          data-id=${r}
          name='input'
          type='checkbox'
          ${r ? 'checked' : null}
        />
          <label></label>
        </td>
      `
    })

    const rowHTML = document.createElement('tr')
    rowHTML.innerHTML = row.join('')
    table.append(rowHTML)
  })
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')
  createTable()
})
