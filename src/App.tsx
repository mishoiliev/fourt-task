import React, { useEffect, useState } from "react";
import ForecastCard from "./components/ForecastCard";
import axios from "axios";
import forecast from "./forecast.json";
import SearchAppBar from "./components/SearchAppBar";
// @ts-ignore
import styled from "styled-components";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface WeatherGroupedByDays {
  date: number;
  fullDate: string;
  overallConditions: string;
  overallWeatherIcon: string;
  weather: any[];
}

function App() {
  const [weatherData, setWeatherData] = useState<any>();
  const [error, setError] = useState<string>();
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [newCountry, setNewCountry] = useState<any>();

  const groupWeatherByDays = () => {
    const weatherGroupedByDays: WeatherGroupedByDays[] = [];

    if (weatherData) {
      weatherData.list.map((forecast: any) => {
        const currDate = new Date(forecast.dt * 1000).getDate();
        const existingDate = weatherGroupedByDays.find(
          (day) => day.date === currDate
        );

        if (existingDate) return existingDate.weather.push(forecast);

        return weatherGroupedByDays.push({
          date: currDate,
          fullDate:
            monthNames[new Date(forecast.dt * 1000).getMonth()] +
            " " +
            currDate,
          overallConditions: forecast.weather[0].main,
          overallWeatherIcon: forecast.weather[0].icon,
          weather: [forecast],
        });
      });
    }

    return weatherGroupedByDays;
  };

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      () => setError("Something went wrong")
    );
  };

  const getWeather = async () => {
    const APIToken = "3aec6781b8daeaf830c830a5619cfb88";
    const baseUrl =
      "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org";

    if (lat && long) {
      setLoading(true);

      await axios
        .get(`${baseUrl}/data/2.5/forecast?lat=35&lon=35&appid=${APIToken}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => setWeatherData(res.data))
        .catch((e) => {
          setWeatherData(forecast);
          console.error(e);
        });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (newCountry) {
      setLong(newCountry.long);
      setLat(newCountry.lat);
    } else {
      getGeolocation();
    }
  }, [newCountry]);

  useEffect(() => {
    if (lat && long && !weatherData) {
      getWeather().catch(console.error);
    }
  }, [lat, long]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="App">
      <SearchAppBar setNewCountry={(value) => setNewCountry(value)} />
      <CardsWrap>
        {weatherData &&
          groupWeatherByDays().map((day, index) => (
            <CardContainer key={index}>
              <ForecastCard weatherData={day} />
            </CardContainer>
          ))}
      </CardsWrap>
    </div>
  );
}

export default App;

const CardsWrap = styled.div`
  display: flex;
  gap: 4%;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CardContainer = styled.div`
  width: 12%;

  @media (max-width: 768px) {
    width: 80%;
    margin: 20px 0;
  }
`;
