import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { WeatherGroupedByDays } from "../App";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(() => ({
  borderRadius: "0",
  display: "flex",
  width: "100%",
  transition: "background 0.2s",
  justifyContent: "center",
  background: "#ccc",
  marginLeft: "auto",
}));

interface Props {
  weatherData: WeatherGroupedByDays;
}
const ForecastCard: React.FC<Props> = ({ weatherData }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card variant={"outlined"} sx={{ maxWidth: "100%", overflow: "hidden" }}>
      <CardHeader
        title={`${weatherData.overallConditions} on ${weatherData.fullDate}`}
        avatar={
          <Avatar
            src={`http://openweathermap.org/img/wn/${weatherData.overallWeatherIcon}@2x.png`}
            alt="weather icon"
          />
        }
      />
      <ExpandMore
        expand={expanded}
        onClick={() => setExpanded(() => !expanded)}
      >
        <ExpandMoreIcon
          style={{
            transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.2s",
          }}
        />
      </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {weatherData.weather.map((time, index) => (
          <CardContent key={index}>
            <Typography
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "22px",
              }}
            >
              {new Date(time.dt * 1000).getHours()}:00
            </Typography>
            <Typography
              style={{
                fontWeight: "600",
                borderBottom: "1px solid #ccc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {time.weather[0].main}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "400",
                  fontSize: "12px",
                }}
              >
                {time.main.temp.toFixed(1)}°C
                <Avatar
                  src={`http://openweathermap.org/img/wn/${time.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
              </div>
            </Typography>
            <Typography>{`Chance of precipitation: ${
              time.pop * 100
            }%`}</Typography>
            <Typography>{`Humidity at ${time.main.humidity}hPa`}</Typography>
            <Typography>{`Cloudiness at ${time.clouds.all}%`}</Typography>
            <Typography>{`Wind speed: ${time.wind.speed}m/s`}</Typography>
            <Typography>{`Wind temperature: ${time.wind.deg}°C`}</Typography>
          </CardContent>
        ))}
      </Collapse>
    </Card>
  );
};

export default ForecastCard;
