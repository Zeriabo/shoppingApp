import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
export const HomeCalendar = () => {
  const [value, onChange] = useState(new Date());
  return (

  <Calendar activeStartDate={value} onChange={onChange} value={value} />
 
  )
}
export default Calendar;