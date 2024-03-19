import { Button, Card, CardContent, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function PaymentDetails() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#c00100",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          marginTop: "60px",
          marginLeft: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            backgroundColor: "#D9D9D9",
            borderRadius: "15px",
            padding: "20px",
            width: "250px",
            height: "450px",
            textAlign: "center",
          }}
        >
          <CardContent>
            <h4
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "15px",
                paddingTop: "5px",
                borderBottom: "1px solid black",
              }}
            >
              Billing Information
            </h4>
            <h4>Service-Consultation</h4>
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>Amount : 500</p>
            <h4>Account Details</h4>
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>
              PayBill : 247247
            </p>
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>
              Account Number : 247247
            </p>

            <TextField
              style={{
                width: "150px",
                padding: "'5px' '0'",
                color: "#c00100",
                borderRadius: "15px",
              }} // Set color to #c00100
              label="Enter Reference Code"
            />

            <Button
              style={{
                backgroundColor: "green",
                color: "black",
                fontSize: "10px",
                width: "175px",
                height: "40px",
                marginTop: "10px",
              }}
            >
              complete transaction
            </Button>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default PaymentDetails;
