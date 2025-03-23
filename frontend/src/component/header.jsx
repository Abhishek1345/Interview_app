const NAV_bar =() => {

    return (
      <header className="bg-black shadow-md border-b border-gray-100 relative">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* App Title */}
        <h1 className="text-2xl font-bold text-cyan-500">
         Interview_App
        </h1>
        
        <div className="flex items-center gap-6">
            <h2 className="text-base font-bold text-cyan-500 cursor-pointer hover:text-gray-300 hover:underline transition duration-300">Home</h2>
            <div className="flex items-center gap-6">
            <h2 className="text-base font-bold text-cyan-500 cursor-pointer hover:text-gray-300 hover:underline transition duration-300">Profile</h2>
            <div className="flex items-center gap-6">
            <h2 className="text-base font-bold text-cyan-500 cursor-pointer hover:text-gray-300 hover:underline transition duration-300">Sign_up</h2>
        </div>
        </div>
        </div>
        </div>
        </header>
    );
};
export default NAV_bar;