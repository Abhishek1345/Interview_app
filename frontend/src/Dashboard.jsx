import { Video, LogIn} from "lucide-react";
import NAV_bar from "./component/header";
import JoinInterviewModal from "./component/JoinInterviewModal";
import { useState } from "react";
import NewCallModal from "./component/NewCallModal";

const MODAL_TYPES = {
    NEW_CALL: "newCall",
    JOIN_INTERVIEW: "joinInterview",
  };
  
const Dashboard = ()=>{
   const [showModal,setShowModal]=useState(false);
   const [modalType, setModalType] = useState(null);
    return (
     <div className="flex flex-col min-h-screen bg-black">
        <NAV_bar/>
        <div className="text-center mt-10 space-y-8">
        
        <h1 className="text-6xl font-bold text-cyan-500">WELCOME BACK</h1>
        <p className="text-gray-500 text-lg text-gray-100">MANAGE YOUR INTERVIEWS AND REVIEW CANDIDATES EFFECTIVELY</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-3xl mx-auto justify-center mt-20">
        {actionCards.map((card, index) => (
          <div key={index} className={`p-6 rounded-lg text-center shadow-lg flex flex-col items-center space-y-5 transition-transform transform hover:scale-105 ${
            index === 0
              ? "bg-gradient-to-br from-green-900 to-gray-900"
              : "bg-gradient-to-br from-purple-900 to-gray-900"
          }`}
          onClick={()=>{
            if (index === 0) {
                setModalType(MODAL_TYPES.NEW_CALL);
                setShowModal(true);
              } else if (index === 1) {
                setModalType(MODAL_TYPES.JOIN_INTERVIEW);
                setShowModal(true);
              }
          }}
          >
            <card.icon className="w-12 h-12 text-green-400" />
            <div className="text-xl font-bold text-white">{card.title}</div>
            <p className="text-gray-400 text-sm">{card.description}</p>
          </div>
        ))}
       </div>
       </div> 
       {showModal && modalType === MODAL_TYPES.JOIN_INTERVIEW && (
        <JoinInterviewModal onClose={() => setShowModal(false)} />
      )}
      {showModal && modalType === MODAL_TYPES.NEW_CALL && (
        <NewCallModal onClose={() => setShowModal(false)} />
      )}
    </div>
    );
};

const actionCards = [
    { title: "New Call", description: "Start an instant call", icon: Video },
    { title: "Join Interview", description: "Enter via invitation link", icon: LogIn },
  ];
export default Dashboard;

