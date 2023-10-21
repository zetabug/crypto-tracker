import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import LineChart from '../components/LineChart';

const CoinPage = () => {
  const [coin, setCoin] = useState({});
  const [chartData, setChartData] = useState();
  const [loading, setLoading] = useState(true);
  const [days,setDays] = useState('24h')
  const { uuid } = useParams();

  async function fetchData(url) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0173291af0msh62b3ca25953f210p13d732jsn66b4d9f97708',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error for the calling function to handle
    }
  }

  async function getCoinData() {
    try {
      const coinData = await fetchData(
        `https://coinranking1.p.rapidapi.com/coin/${uuid}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=30d`
      );
      setCoin(coinData.coin);
    } catch (error) {
      // Handle error (e.g., show an error message to the user)
    }
  }

  async function getData() {
    try {
      const result = await fetchData(
        `https://coinranking1.p.rapidapi.com/coin/${uuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${days}`
      );

      const extractedData = result.history.map((entry) => entry.price);
      const extractedTimestamps = result.history.map((entry) => entry.timestamp);
      console.log(extractedTimestamps)

      setChartData({
        labels: extractedTimestamps.map((timestamp) => formatTimestamp(timestamp)),
        datasets: [
          {
            label: `Price in USD($)`,
            data: extractedData,
          },
        ],
        
      });
    } catch (error) {
      // Handle error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await Promise.all([getCoinData(), getData()]);
    }
    fetchData();
  }, [uuid,days]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  
    const formattedTime =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
  
    const formattedDate = date.toLocaleDateString();
    if(days==='24h'){
      return formattedTime
    }else{
      return formattedDate;
    }
  };
  
  

  return (

      <Grid container spacing={2} paddingX={{md:10}} >
        <Grid item xs={12} md={4}>
          <img src={coin.iconUrl} alt="Description" width={100} /> <br />
          <h2>{coin.name}</h2> <br />
          <span>Rank: {coin.rank}</span> <br />
          <span>Price: $ {Number(coin.price).toFixed(2)} </span>
          <br />
          <span>Market Capital: ${coin.marketCap} </span> <br />
          <p>{coin.description}</p>
          <br />
        </Grid>

        <Grid item xs={12} md={8}>
          {loading ? <p>Loading...</p> : <LineChart chartData={chartData} setDays={setDays} days={days}/>}
        </Grid>
      </Grid>
    
  );
};

export default CoinPage;
