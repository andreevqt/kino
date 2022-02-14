import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

type TBaseProps = {
  className?: string;
};

const Base: React.FC<TBaseProps> = ({ children, className }) => {
  return (
    <>
      <Header />
      <main className={className}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Base;
