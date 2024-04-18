import React from 'react';
import Header from '../pages/Header';

export default function Layout({children}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
