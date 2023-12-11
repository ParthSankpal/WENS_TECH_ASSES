import React from "react";

const CreateListing = () => {
  return (
    <main className=" font-Higuen p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center my-7">Create a listing</h1>

      <form className=" flex flex-col sm:flex-row gap-10">
        <div className=" flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="64"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            maxLength="64"
            minLength="10"
            required
          />
          <div className=" flex gap-6 flex-wrap">
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="sell" className=" w-5" />
              <span>Sell</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="rent" className=" w-5" />
              <span>Sell</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="parking" className=" w-5" />
              <span>Parking spot</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="furnished" className=" w-5" />
              <span>Furnished</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="offers" className=" w-5" />
              <span>Offers</span>
            </div>
          </div>
          <div className=" flex flex-wrap gap-6">
            <div className=" flex items-center gap-2">
              <input
                type="number"
                className=" p-3 border border-gray-300 rounded-lg"
                id="beadroom"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                className=" p-3 border border-gray-300 rounded-lg"
                id="bathrooms"
                max="10"
                required
              />
              <p>Bath</p>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                className=" p-3 border border-gray-300 rounded-lg"
                id="regularprice"
                max="10"
                required
              />
              <div className=" flex flex-col items-center">
                <p>Regular Price</p>
                <span className=" text-xs">($/Month)</span>
              </div>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                className=" p-3 border border-gray-300 rounded-lg"
                id="disscountprice"
                max="10"
                required
              />
              <div className=" flex flex-col items-center">
                <p>Disscount Price</p>
                <span className=" text-xs">($/Month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col flex-1 gap-4">
          <p className=" ">
            Images :
            <span className=" text-gray-600 ml-2">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className=" flex gap-4">
            <input className=" p-3 border border-gray-300 rounded w-full" type="file" name="" id="images" accept="image/*" multiple />
            <button className=" p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
          </div>
        <button className=" p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-85">Create Listing</button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
