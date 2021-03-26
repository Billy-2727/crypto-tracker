import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import CoinData from '../components/CoinData';
import CoinHistory from '../components/CoinHistory';
import gecko from '../apis/gecko'
import '../App.css';


const Details = () => {
    const { id } = useParams();
    const [coinData, setCoinData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const formatData = (data) => {
      return data.map((el) => {
        return {
          t: el[0],
          y: el[1].toFixed(2),
        };
      });
    };
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const [day, week, year, detail] = await Promise.all([
          gecko.get(`/coins/${id}/market_chart/`, {
            params: {
              vs_currency: "usd",
              days: "1",
            },
          }),
          gecko.get(`/coins/${id}/market_chart/`, {
            params: {
              vs_currency: "usd",
              days: "7",
            },
          }),
          gecko.get(`/coins/${id}/market_chart/`, {
            params: {
              vs_currency: "usd",
              days: "365",
            },
          }),
          gecko.get("/coins/markets/", {
            params: {
              vs_currency: "usd",
              ids: id,
            },
          }),
        ]);
        console.log(day);
  
        setCoinData({
          day: formatData(day.data.prices),
          week: formatData(week.data.prices),
          year: formatData(year.data.prices),
          detail: detail.data[0],
        });
        setIsLoading(false);
      };
  
      fetchData();
    }, []);
  
    const renderData = () => {
      if (isLoading) {
        return <div className='details-loading'>Loading....</div>;
      }
      return (
        <div className="coinlist">
          <CoinHistory data={coinData} />
          <CoinData data={coinData.detail} />
        </div>
      );
    };
  
    return renderData();
  };
  
  export default Details;