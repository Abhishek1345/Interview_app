import React from 'react';
import { X } from 'lucide-react';

function JoinInterviewModal({onClose}) {
  return (
    
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center'>
      <div className='bg-[#1E1E1E] border border-gray-700 rounded-lg p-5 w-[60%] max-w-md shadow-lg relative mt-5 flex flex-col gap-2 text-white'>
            <button onClick={onClose}className='place-self-end text-gray-400 hover:text-gray-200'>
            <X size={30} />
            </button>  
            <h1 className="text-2xl font-semibold">Join Meeting</h1>
            <input type="text"
            placeholder="Paste meeting link here..."
            className="w-full mt-2 px-20 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            /> 
            <div className='mt-3 flex justify-end space-x-2'>
                <button className="px-5 py-1 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600">Cancel</button>
               
                <button className="px-6 py-1 bg-green-800 rounded-lg text-white hover:bg-green-900">Join Meeting</button>
                
            </div> 
      </div>
    </div>
  )
};

export default JoinInterviewModal