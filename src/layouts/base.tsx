import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

const Base: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Base;
