import React from 'react';
import { X } from 'lucide-react';

function NewCallModal({onClose}) {
  return (
    
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-[#1E1E1E] border border-gray-700 rounded-lg p-5 w-[60%] max-w-md shadow-lg relative mt-5 flex flex-col gap-2 text-white'>
            <button onClick={onClose}className='place-self-end text-gray-400 hover:text-gray-200'>
            <X size={30} />
            </button>  
            <h1 className="text-2xl font-semibold">Start Meeting</h1>
            <div className='mt-3 flex justify-end space-x-2'>
                <button className="px-5 py-1 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600">Cancel</button>
               
                <button className="px-6 py-1 bg-green-800 rounded-lg text-white hover:bg-green-900">Start Meeting</button>
                
            </div> 
      </div>
    </div>
  )
};

export default NewCallModal