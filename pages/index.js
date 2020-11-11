import React, { Component } from 'react';
import AstroList from '../pages_support/astroList.js';
import Head from 'next/head';

export default function Home() {
  return (          
    <div>
        <Head>
            <title>astronauti</title>        
        </Head>
      <h1>Astronauti</h1>
      <AstroList />
    </div>
  );
}
