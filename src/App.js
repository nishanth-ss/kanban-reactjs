import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment/moment';

function App() {
  const [dateVal, setDateVal] = useState('')
  const [txt,setTxt] = useState('')
  const DB_URL = 'http://localhost:8001/posts'
  let [eventDetailsList, setEventDetailsList] = useState([])
  useEffect(()=>{
    getEventDetails()
  },[]) 

  const validateDateAndEventName = () => {
    if (dateVal == null) {
      alert("Please Enter the Date ")
      return false;
    } else if (txt == null || txt == '') {
      alert("Please Enter the Event Name ")
        return false;
    }
    return true;
  }

  
  const dateValidation = (status, dateVal) => {
    let selectedDate = moment(moment(dateVal).format()).valueOf()
    let currentDate = moment(moment(moment().format('YYYY-MM-DD')).format()).valueOf()
    if (currentDate == selectedDate && !status['currentDateListStatus']) {
      alert("CurrentDate is Full!")
      return false
    } else if(currentDate < selectedDate && !status['futureDateListStatus']) {
      alert("FutureDate is Full!")
      return false
    } else if (currentDate > selectedDate && !status['previousDateListStatus']) {
      alert("PreviousDate is Full!")
      return false
    }
    return true;
  }


  const eventLengthValidation = (dateVal) => {
   let status = {
    previousDateListStatus: true,
    currentDateListStatus: true,
    
    futureDateListStatus: true
   }
   const previousDateList =  eventDetailsList.filter(row => row.previousDate)
   if (previousDateList.length >= 5) {
    status['previousDateListStatus'] = false;
   }
   const currentDateList =  eventDetailsList.filter(row => row.currentDate)
   if (currentDateList.length >= 5) {
    status['currentDateListStatus'] = false;
 }
   const futureDateList =  eventDetailsList.filter(row => row.futureDate)
   if (futureDateList.length >= 5) {
    status['futureDateListStatus'] = false;
 }

    return dateValidation(status, dateVal)
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
    console.log(dateVal);
    console.log(txt);
    if (validateDateAndEventName() && eventLengthValidation(dateVal)) {
       const eventDetail = {
          'eventDate': dateVal,
          'eventName': txt
        }
        postEvents(eventDetail)
    }
  }

  const postEvents = (event) => {
      axios.post(DB_URL, event).then(response => {
        alert("Event Data Saved Successfully!")
        getEventDetails()
      }).catch(err => {
        console.error(err)
      })
  }

  const getEventDetails = () => {
    axios.get(DB_URL).then(response => {
        setEventDetailsList([])
        const data = response['data']
        if (data != null && data.length > 0) {
            data.forEach(row =>  {
                  let selectedDate =moment(moment(row['eventDate']).format()).valueOf()  // 2023-05-05 
                  let currentDate = moment(moment(moment().format('YYYY-MM-DD')).format()).valueOf() // 2023-06-03
                  if (currentDate == selectedDate) {
                    row['currentDate'] = true
                  } else if(currentDate < selectedDate) {
                    row['futureDate'] = true
                  } else if (currentDate > selectedDate) {
                    row['previousDate'] = true
                  }

                setEventDetailsList(test => [...test, row])
            })
          }
    })
  }

  return (
    <div>
      <input type='date' onChange={(e)=>setDateVal(e.target.value)}/>
      <input type='text' placeholder='enter event' onChange={(e)=>setTxt(e.target.value)} />
      <button type='submit' onClick={handleSubmit}>Submit</button>
      {/* <Kanban eventDetails={eventDetailsList}/> */}
      <div>
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
            <tr>
            <td>
               
            </td>
            <td>
            {
                eventDetailsList.map(row => (
                  row.previousDate ?  (
                  <ul>
                    <li>{row.eventDate}</li>
                    <li>{row.eventName}</li>
                  </ul> ) : null ))
               }
            </td>
            <td>
            {
                eventDetailsList.map(row => (
                  row.currentDate ?  (
                  <ul>
                    <li>{row.eventDate}</li>
                    <li>{row.eventName}</li>
                  </ul> ) : null ))
               }
            </td>
            <td>
            {
                eventDetailsList.map(row => (
                  row.futureDate ?  (
                  <ul>
                    <li>{row.eventDate}</li>
                    <li>{row.eventName}</li>
                  </ul> ) : null ))
               }
            </td>
            </tr>
      </tbody>
    </Table>
    </div>
    </div>
  );
}

export default App;
