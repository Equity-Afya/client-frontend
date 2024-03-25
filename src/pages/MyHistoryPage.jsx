import React from "react"
import Sidebar from "../components/SideBar/SideBar";
import MyHistory from "../components/Booking/MyHistory"
import { Box } from "@mui/system";


const MyHistoryPage = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar on the left with margin-right */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "o o auto",
          marginRight: "32px",
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
          overflowY: "auto",
          marginTop: "48px",
          marginLeft: "32px",
        }}
      >
        <MyHistory />
      </Box>
    </Box>
  );
}

export default MyHistoryPage


