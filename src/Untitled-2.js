eventDetailsList.map(row => (
    row.previousDate ? (
        <tr  key={row.id}>
        <td>{row.id}</td>
        <td>{row.eventDate}</td>
        <td></td>
        <td></td>
        </tr>
) : row.currentDate ? (
  <tr key={row.id}>
  <td>{row.id}</td>
  <td></td>
  <td>{row.eventDate}</td>
  <td></td>
  </tr>
) : 
  <tr key={row.id}>
  <td>{row.id}</td>
  <td></td>
  <td></td>
  <td>{row.eventDate}</td>
  </tr>
)
)  