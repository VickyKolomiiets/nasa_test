import React, { useState, useEffect } from "react";
import NeoListItem from "./NeoListItem";
import { getNEOs } from "../../services/nasaAPI";

const NEOList = () => {
  const [neoData, setNeoData] = useState<any>([]);
  const [startIndex, setStartIndex] = useState(0);

  const fetchData = async (startDate, endDate) => {
    const data = await getNEOs(startDate, endDate);
    // Aggregate the data as needed here before setting it
    return data;
  };

  return <div>{/* <NeoListItem key={index} item={item} /> */}</div>;
};

export default NEOList;
