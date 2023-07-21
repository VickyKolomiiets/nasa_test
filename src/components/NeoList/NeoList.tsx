import React, { useState, useEffect } from "react";
import NeoListItem from "./NeoListItem";
import { getNEOs } from "../../services/nasaAPI";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const NEOList = () => {
  const [aggregatedData, setAggregatedData] = useState<any>([]);
  const [startDay, setStartDay] = useState(1);

  console.log(aggregatedData);
  const fetchData = async (startDate, endDate) => {
    const data = await getNEOs(startDate, endDate);
    return data;
  };

  const fetchAllData = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    let endDay = today.getDate();

    const startDateString = `${year}-${month
      .toString()
      .padStart(2, "0")}-${startDay.toString().padStart(2, "0")}`;
    const endDateString = startDateString;

    const data = await fetchData(startDateString, endDateString);

    for (let date in data.near_earth_objects) {
      let maxDiameter = 0;
      let hazardousNEOs = 0;
      let closestNEO = Infinity;
      let fastestNEO = 0;

      for (let neo of data.near_earth_objects[date]) {
        if (neo.estimated_diameter_max > maxDiameter) {
          maxDiameter = neo.estimated_diameter_max;
        }

        if (neo.is_potentially_hazardous_asteroid) {
          hazardousNEOs++;
        }

        if (neo.close_approach_data[0].miss_distance.kilometers < closestNEO) {
          closestNEO = neo.close_approach_data[0].miss_distance.kilometers;
        }

        if (
          neo.close_approach_data[0].relative_velocity.kilometers_per_hour >
          fastestNEO
        ) {
          fastestNEO =
            neo.close_approach_data[0].relative_velocity.kilometers_per_hour;
        }
      }

      setAggregatedData((prev) => [
        ...prev,
        {
          date,
          maxDiameter,
          hazardousNEOs,
          closestNEO,
          fastestNEO,
        },
      ]);
    }

    setStartDay((prevDay) => prevDay + 1);

    if (startDay > endDay) {
      setStartDay(1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllData();
    }, 5000); // Every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [startDay]);

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              NASA
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {startDay}
              </Typography>

              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                {" "}
                Max Diameter: {aggregatedData.maxDiameter}
              </Typography>

              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                {" "}
                Hazardous NEOs: {aggregatedData.hazardousNEOs}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                {" "}
                Closest NEO: {aggregatedData.closestNEO}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                {" "}
                Fastest NEO (Km/h): {aggregatedData.fastestNEO}
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid spacing={4} style={{ gap: "5px" }}>
              {/* <Grid item xs={12} sm={6} md={4}> */}
              {aggregatedData.slice(-6).map((item, index) => (
                <NeoListItem item={item} />
              ))}
              {/* </Grid> */}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
};

export default NEOList;
