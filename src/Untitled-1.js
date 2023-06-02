row.currentDate ? (
    <tr>
    <td>{row.id}</td>
    <td></td>
    <td>{row.eventDate}</td>
    <td></td>
    </tr>
  ) : 
  (<tr>
    <td>{row.id}</td>
    <td></td>
    <td></td>
    <td>{row.eventDate}</td>
    </tr>
  )