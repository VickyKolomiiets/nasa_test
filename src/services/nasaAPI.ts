export const getNEOs = async (startDate: string, endDate: string) => {
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
};
