import { Card, CardContent, List, ListItem, Typography } from "@mui/material";
import { FaList } from "react-icons/fa";

export default function App() {
  return (
    <Card style={{ margin: "20px", padding: "10px" }}>
      <CardContent>
        <Typography variant="h5">
          <FaList style={{ marginRight: 10 }} />
          List Micro Frontend
        </Typography>

        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </CardContent>
    </Card>
  );
}