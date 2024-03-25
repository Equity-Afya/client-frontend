import { Button, Card, CardContent, TextField, Modal } from "@mui/material";

const Receipt = () => {
  return (
    <Card
      style={{
        width: "40%",
        height: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d9d9d9",
      }}
    >
      <CardContent>
        <h3>Equityafya Ruiru</h3>
        <p>TEL: 0712345678</p>
        <p>Email: shgdeufueyw@gmail.com</p>
        <h2>PAYMENT RECEIPT</h2>
        <h3>Name: Damon Salvatore</h3>
        <h3>Date: 12-12-2012</h3>
        <h3>Amount: 00</h3>
        <Button variant="contained" color="primary">
          Print
        </Button>
      </CardContent>
    </Card>
  );
};

export default Receipt;
