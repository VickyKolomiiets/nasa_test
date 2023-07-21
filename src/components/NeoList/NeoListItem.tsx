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
      style={{
        backgroundColor: item.is ? "red" : "",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: "56.25%",
        }}
        image="https://www.esa.int/var/esa/storage/images/esa_multimedia/videos/2017/04/visualisation_of_asteroid_itokawa/16919406-1-eng-GB/Visualisation_of_asteroid_Itokawa_pillars.jpg"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          Day: {item.date}
        </Typography>
        <Typography>Max item: {item.maxDiameter}</Typography>
        <Typography>Hazardous NEOs: {item.isHazardous}</Typography>
        <Typography>Closest NEO: {item.closestNEO}</Typography>
        <Typography>Fastest NEO: {item.fastestNEO}</Typography>
      </CardContent>
    </Card>
  );
};

export default NeoListItem;
