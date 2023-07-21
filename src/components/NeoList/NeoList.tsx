import React, { useState, useEffect } from "react";
import NeoListItem from "./NeoListItem";
import { getNEOs } from "../../services/nasaAPI";

import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const NEOList = () => {
  const [aggregatedData, setAggregatedData] = useState<any>([]);
  const [currentDay, setCurrentDay] = useState(1);

  const fetchData = async (startDate) => {
    let endDate = startDate;
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
      .padStart(2, "0")}-${currentDay.toString().padStart(2, "0")}`;

    const data = await fetchData(startDateString);

    for (let date in data.near_earth_objects) {
      let maxDiameter = 0;
      let hazardousNEOs = 0;
      let closestNEO = Infinity;
      let fastestNEO = 0;

      for (let neo of data.near_earth_objects[date]) {
        if (
          neo.estimated_diameter.kilometers.estimated_diameter_max > maxDiameter
        ) {
          maxDiameter =
            neo.estimated_diameter.kilometers.estimated_diameter_max;
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

    setCurrentDay((prevDay) => prevDay + 1);

    if (currentDay > endDay) {
      setCurrentDay(1);
      setAggregatedData((prev) => [...prev.slice(-6)]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentDay]);

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              NASA
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography align="center" color="text.primary" gutterBottom>
                Near-Earth Objects (NEOs) are comets and asteroids that have
                been nudged by the gravitational attraction of nearby planets
                into orbits that allow them to enter the Earth’s neighborhood.
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid>
              {aggregatedData.length < 1 ? "Loading" : ""}

              {aggregatedData.slice(-6).map((item) => (
                <NeoListItem item={item} key={item.date} />
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
};

export default NEOList;
