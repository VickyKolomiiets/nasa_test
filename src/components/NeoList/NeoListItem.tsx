import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const NeoListItem = ({ item, aggregatedData }: any) => {
  return (
    <Card
      style={{
        backgroundColor: item.is_potentially_hazardous_asteroid ? "red" : "",
      }}
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
        <Typography>Name: {item.name}</Typography>
        <Typography>ID: {item.id}</Typography>

        <Typography>
          Potentially hazardous:{" "}
          {item.is_potentially_hazardous_asteroid ? "Yes" : "No"}
        </Typography>
        <Typography>
          Is sentry: {item.is_sentry_object ? "Yes" : "No"}
        </Typography>
        <Typography>
          Km/h:{" "}
          {item.close_approach_data[0].relative_velocity.kilometers_per_hour}
        </Typography>
      </CardContent>
    </Card>

    // <Card variant="outlined">
    //   <div >
    //     <p>Max Diameter: {item.maxDiameter}</p>
    //     <p>Hazardous NEOs: {item.hazardousNEOs}</p>
    //     <p>Closest NEO: {item.closestNEO}</p>
    //     <p>Fastest NEO: {item.fastestNEO}</p>
    //   </div>
    // </Card>
  );
};

export default NeoListItem;
