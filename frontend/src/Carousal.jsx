import React, { useEffect, useState } from "react";

export default function Carousal({ children: slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(slides) - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === React.Children.count(slides) - 1 ? 0 : prevIndex + 1
    );
  };
  useEffect(()=>{
    const slideINt=setInterval(next,3000)
    return ()=>clearInterval(slideINt)
  },[])
  return (
    <div className='overflow-hidden w-fit relative'>
      <div
        className='flex transition-transform duration-700 ease-in'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {React.Children.map(slides, (child, index) => (
          <div className='flex-none w-full'>{child}</div>
        ))}
      </div>
      <div className='absolute inset-0 flex items-center justify-between p-4'>
        <button
          onClick={prev}
          className='p-1 rounded-full bg-gray-800 text-gray-50'>{`<`}</button>
        <button
          onClick={next}
          className='p-1 rounded-full bg-gray-800 text-gray-50'>{`>`}</button>
      </div>
    </div>
  );
}

