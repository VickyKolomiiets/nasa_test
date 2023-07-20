import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const NeoListItem = ({ item }: any) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: "56.25%",
        }}
        image="https://source.unsplash.com/random?wallpapers"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          Heading
        </Typography>
        <Typography>Max Diameter: {item.maxDiameter}</Typography>

        <Typography>Hazardous NEOs: {item.hazardousNEOs}</Typography>
        <Typography>Closest NEO: {item.closestNEO}</Typography>
        <Typography>Fastest NEO: {item.fastestNEO}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>

    // <Card variant="outlined">
    //   <div style={{ backgroundColor: item.isHazardous ? "red" : "white" }}>
    //     <p>Max Diameter: {item.maxDiameter}</p>
    //     <p>Hazardous NEOs: {item.hazardousNEOs}</p>
    //     <p>Closest NEO: {item.closestNEO}</p>
    //     <p>Fastest NEO: {item.fastestNEO}</p>
    //   </div>
    // </Card>
  );
};

export default NeoListItem;
