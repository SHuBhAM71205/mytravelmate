import Carousal from "./Carousal"

function App() {

  return (
    <>
      <div className="absolute top-0 z-10 flex items-center justify-center w-screen h-screen p-4 overflow-auto">
        <div className="flex flex-col md:flex-row w-screen h-[95%]  rounded-xl shadow-gray-950/90 shadow-2xl/45 overflow-hidden">

          <div className=" flex flex-col  justify-center">
            <Carousal>
              <img src="../../public/image1.png" className='h-full object-cover' alt="" />
              <img src="../../public/image2.png" className='h-full object-cover' alt="" />
              <img src="../../public/image3.png" className='h-full object-cover' alt="" />
            </Carousal>
          </div>

          <div className="flex-1 p-6 bg-blue-200  overflow-auto">

          </div>
        </div>
      </div>

    </>
  )
}

export default App
