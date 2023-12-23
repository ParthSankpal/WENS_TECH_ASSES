import React from 'react'

const Search = () => {
  return (
    <div className=' font-Higuen flex flex-col md:flex-row'>
        <div className=" p-7 border-b-2 md:border-r-2 md:min-h-screen md:max-w-sm">
            <form action="" className=' flex flex-col gap-8'>
                <div className=" flex items-center gap-2 ">
                    <label className=' whitespace-nowrap font-semibold'> Search Term : </label>
                    <input type="text" name="" id="searchTerm" placeholder='Search' className=' border rounded-lg p-3 w-full'/>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className=' font-semibold'>Type :</label>
                    <div className=" flex gap-2">
                        <input type="checkbox" name="" id="all" className=''/>
                        <span>Rent & Sale</span>
                    </div>
                    <div className=" flex gap-2">
                        <input type="checkbox" name="" id="rent" className=''/>
                        <span>Rent</span>
                    </div>
                    <div className=" flex gap-2">
                        <input type="checkbox" name="" id="sale" className=''/>
                        <span>Sale</span>
                    </div>
                    <div className=" flex gap-2">
                        <input type="checkbox" name="" id="offer" className=''/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className=' font-semibold'>Amenities :</label>
                    <div className=" flex gap-2">
                        <input type="checkbox" name="" id="parking" className=''/>
                        <span>Parking</span>
                    </div>
                    <div className=" flex gap-2">
                        <input type="checkbox" name="" id="furnished" className=''/>
                        <span>Furnished</span>
                    </div>
                    <div className=" flex items-center gap-2">
                        <label className=' font-semibold'> Sort :</label>
                        <select id="sort_order" className=' border rounded-lg p-3'>
                            <option value="">Price high to low</option>
                            <option value="">Price low to high</option>
                            <option value="">latest</option>
                            <option value="">Oldest</option>
                        </select>
                    </div>
                </div>
                    <button className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
            </form>
        </div>
        <div className="">
            <h1 className=' text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Results : </h1>
        </div>
    </div>
  )
}

export default Search