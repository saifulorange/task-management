import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Default = ({children}) => {
  return (
    <div>
        <Header />
          <div className='page-content'>{children}</div>
        <Footer />
    </div>
  )
}

export default Default