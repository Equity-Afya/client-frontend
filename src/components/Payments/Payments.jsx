import { Box, TextField } from "@mui/material";
import logo from "../../assets/Lipanampesa.png";
import myImage from "../../assets/CardImage.png";

const Payments = () => {
  return (
    <Box
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        height: "600px",
        marginTop: "50px",
        width: "550px", // Adjusted width of the main box
        backgroundColor: "#d9d9d9",
        borderRadius: "20px",
        padding: "20px", // Added padding for spacing
      }}
    >
      <h3
        style={{
          paddingLeft: "1px 0",
          width: "75%",
          outline: "1px solid #c00100", // Adjusted border bottom
          borderRadius: "5px",
          marginBottom: "10px", // Added margin bottom
          textAlign: "center", // Centered text
        }}
      >
        Pay Via
      </h3>
      <Box
        style={{
          outline: "1px solid #c00100",
          width: "400px",
          borderRadius: "10px",
          marginBottom: "25px", // Added margin bottom
          marginLeft: "25px", // Added margin left
          marginRight: "25px", // Added margin right
        }}
      >
        <h4
          style={{
            marginBottom: "10px", // Added margin bottom
            textAlign: "left", // Set text alignment to left
          }}
        >
          Lipa na M-Pesa
        </h4>
        <img
          src={logo}
          alt="Lipa na M-Pesa image"
          style={{
            width: "80px",
            height: "auto",
            margin: "0 auto 10px",
            display: "block",
          }} // Set fixed width and auto height
        />
        <TextField
          style={{
            width: "100%",
            padding: "8px", // Adjusted padding for the TextField
          }}
          label="Enter Mobile Number" // Added label for clarity
          variant="outlined"
        />
      </Box>
      <Box
        style={{
          outline: "1px solid #c00100",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "25px", // Added margin bottom
          marginLeft: "25px", // Added margin left
          marginRight: "25px", // Added margin right
        }}
      >
        <h4
          style={{
            marginBottom: "10px", // Added margin bottom
            textAlign: "center", // Centered text
          }}
        >
          Pay with card
        </h4>
        <img
          src={myImage}
          alt="Card payment image"
          style={{
            width: "80px",
            height: "auto",
            margin: "0 auto",
            display: "block",
          }} // Set fixed width and auto height
        />
      </Box>
    </Box>
  );
};

export default Payments;
