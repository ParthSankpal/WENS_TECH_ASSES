import { useSelector } from "react-redux"


const Profile = () => {

  const {currentUser} = useSelector((state)=> state.user)


  return (
    <div className="font-Higuen p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center ">Profile</h1>

      <form action="" className=" flex flex-col gap-4">
        
        <img src={currentUser.avatar} alt="profile_image" className=" rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-4"/>
      
        <input type="text" id="username" placeholder="username" className=" border p-3 rounded-lg" />
        
        <input type="text" id="email" placeholder="email" className=" border p-3 rounded-lg" />
        
        <input type="text" id="password" placeholder="password" className=" border p-3 rounded-lg" />
        
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">update</button>
      
      </form>

      <div className=" flex justify-between mt-5">
        <span className=" text-red-700 cursor-pointer">Delete Account</span>
        <span className=" text-red-700 cursor-pointer">Sign out</span>
      </div>

    </div>
  )
}

export default Profile