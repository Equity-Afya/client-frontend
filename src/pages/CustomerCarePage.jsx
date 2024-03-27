import Sidebar from "../components/SideBar/SideBar";
import CustomerCare from "../components/CustomerCare/CustomerCare";






function CustomerCarePage () {

          return(
          <div style={{ display:"flex", flexDirection:"row"}}>
            <Sidebar/>
         <CustomerCare/>
   


          </div>



          );



};
export default CustomerCarePage;