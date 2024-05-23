import DashboardHeader from "../components/DoctorsDashboard/DashboardHeader";
import DoctorsSideBar from "../components/DoctorsSideBar/DoctorsSidebar";
import Appointment from "../components/DoctorsDashboard/Appointment";
import WelcomeBack from "../components/DoctorsDashboard/WelcomeBack";
import Report from "../components/DoctorsDashboard/Report";
import LineCharts from "../components/DoctorsDashboard/LineCharts";
import DonutCharts from "../components/DoctorsDashboard/DonutCharts";
import Calendar from "../components/DoctorsDashboard/Calendar";


const DoctorsDashboardPage = () => {
  return (
    <>
     <div>
       <DoctorsSideBar/>
     </div>
     <div style={{paddingLeft: "18%"}}>
       <div>
         <DashboardHeader/>
       </div>
       <div>
         <div>
           <WelcomeBack/>
           <Report/>
           <LineCharts/>
           <DonutCharts/>
         </div>
        
         <div>
           <Calendar/>
           <Appointment/>
         </div>
       
       </div>
        
     </div> 
      
    </>
  )
}

export default DoctorsDashboardPage
