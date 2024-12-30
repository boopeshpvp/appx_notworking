import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const YearPicker = ({ selectedYear, onClick }) => {
  const [startDate, setStartDate] = useState(new Date(selectedYear, 0, 1));

  const handleChange = date => {
    setStartDate(date);
    onClick(date.getFullYear());
  };

  return (
    <DatePicker
      selected={startDate}
      // onChange={handleChange}
      onSelect={handleChange}
      dateFormat="yyyy"
      showYearPicker
      inline
    />
  );
};

export default YearPicker;