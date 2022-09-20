import React from 'react';

export type CartItemType = {
  id: number|undefined;
  category: string;
  description: string;
  image: string;
  price: number|undefined;
  title: string;
  amount: number;
};

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='calendar'>
        </div>
      </header>
      <body className="AppBody">
    
      </body>
    </div>
  );
}

export default Home;


