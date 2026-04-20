import { Button, Card, CardContent, Typography } from "@mui/material";
import { FaChartLine } from "react-icons/fa";

export default function App() {
  return (
    <Card style={{ margin: "20px", padding: "10px" }}>
      <CardContent>
        <Typography variant="h5">
          <FaChartLine style={{ marginRight: 10 }} />
          Dashboard Micro Frontend
        </Typography>

        <Typography variant="body2" style={{ marginTop: 10 }}>
          This is your dashboard section powered by MFE.
        </Typography>

        <Button variant="contained" color="primary" style={{ marginTop: 15 }}>
          Explore
        </Button>
      </CardContent>
    </Card>
  );
}