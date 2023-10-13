import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState, useEffect } from 'react';
import { Dna } from  'react-loader-spinner'

const style = {
  height: 30,
  border: '1px solid green',
  margin: 6,
  padding: 8,
};

function App() {
  const initialItems = Array.from({ length: 100 }, (_, index) => `Item #${index + 1}`);
  const itemsPerPage = 20;

  const [items, setItems] = useState([]);
  const [itemsDisplayed, setItemsDisplayed] = useState(0);

  const fetchMoreData = () => {
    setTimeout(()=>{

      const startIndex = itemsDisplayed;
      const endIndex = startIndex + itemsPerPage;
      const newItems = initialItems.slice(startIndex, endIndex);
      setItems([...items, ...newItems]);
      setItemsDisplayed(endIndex);
    },2000)
  }

  useEffect(() => {
    fetchMoreData();
  }, []); // Empty dependency array to run this only once

  return (
    <div>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={itemsDisplayed < initialItems.length}
        loader={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        }
      >
        {items.map((item, index) => (
          <div style={style} key={index}>
            {item}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;


