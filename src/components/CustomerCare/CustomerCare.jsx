import React from "react";
import './CustomerCare.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import HomeIcon from '@mui/icons-material/Home';






function  CustomerCare()  {
         return(
            <div>
             <Card style={{height:800, width:200, background:'#C00100', marginTop:"auto"}}>
             <CardContent>
                <div className="cust">
              <HomeIcon style={{ color:'white'}} />
              <a className="custo" href="/dashboard">Home</a>
              </div>
              






             
             </CardContent>





             </Card>


            </div>





         );



};


export default CustomerCare;