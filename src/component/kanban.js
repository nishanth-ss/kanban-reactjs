import React from 'react';
import Table from 'react-bootstrap/Table';

const Kanban = ({eventDetails}) => {
  return (
    <div>
        {eventDetails}
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Previous Date</th>
          <th>Current Date</th>
          <th>Future Date</th>
        </tr>
      </thead>
      <tbody>
        {
            eventDetails.map(row => (
                row.previousDate ? (
                    <tr>
                    <td>{row.id}</td>
                    <td>{row.eventDate}</td>
                    <td></td>
                    <td></td>
                    </tr>
            ) : null
            ))  
        }
       
      </tbody>
    </Table>
    </div>
  )
}

export default Kanban