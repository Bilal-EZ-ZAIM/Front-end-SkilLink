import React from 'react';
import './headingSection.css';





const HeadingSection = ({ titre }) => {
  return (
    <div className='heading d-flex justify-content-center align-items-center'>
      {titre}
    </div>
  );
};

export default HeadingSection;
