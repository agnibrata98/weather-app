import axios from 'axios';
import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Container, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';

const MainWeather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [weatherForecast, setWeatherForecast] = useState(null);

    const getWeather = async () => {
        if (!city.trim()) return; // Ensure city is not empty
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f66d9727501911f62c328508b94c5e3e&units=metric`;
        try {
            const response = await axios.get(url);
            setWeather(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };


    const getWeatherForecast = async () => {
        if (!city.trim()) return;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f66d9727501911f62c328508b94c5e3e&units=metric`;
        try {
            const response = await axios.get(url);
            const forecastData = response.data.list.filter((_, index) => index % 8 === 0); // 8 intervals per day
            // const forecastData = response.data.list.slice(1, 5); 
            setWeatherForecast(forecastData);
            console.log(forecastData);
            // console.log(response.data);
        } catch (error) {
            console.error("Error fetching forecast data:", error);
        }
    };

    const handleSearch = () => {
        getWeather();
        getWeatherForecast();
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Weather App</Typography>
            <TextField
                label="Enter City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={!city.trim()}
                style={{ marginLeft: '10px' }}
            >
                Search
            </Button>

            {weather && (
                <Container>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">Description: {weather.weather[0].description}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">Temperature: {weather.main?.temp}°C</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">Feels Like: {weather.main?.feels_like}°C</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">Max temp.: {weather.main?.temp_max}°C</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">Min temp.: {weather.main?.temp_min}°C</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">Weather: {weather.weather?.[0]?.description}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">Humidity: {weather.main?.humidity}%</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">Wind Speed: {weather.wind?.speed} m/s</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">
                                    Sunrise: {weather.sys?.sunrise ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString() : 'N/A'}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">
                                    Sunset: {weather.sys?.sunset ? new Date(weather.sys.sunset * 1000).toLocaleTimeString() : 'N/A'}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">
                                    Country:  {weather.sys?.country}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">
                                    Pressure:  {weather.main?.pressure}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            )}

            {/* 5-Day Weather Forecast */}
            {weatherForecast && weatherForecast.length > 0 && (
                <Container style={{ marginTop: '20px' }}>
                    <Typography variant="h5" gutterBottom>5-Day Forecast</Typography>
                    <List>
                        {weatherForecast.map((forecast, index) => (
                            <ListItem key={index} style={{ marginBottom: '15px', padding: '20px', borderRadius: '8px', backgroundColor: '#f5f5f5' }} component={Paper} elevation={3}>
                                <ListItemText
                                    primary={`Date: ${new Date(forecast.dt * 1000).toLocaleDateString()}`} 
                                    secondary={
                                        <>
                                            <Typography variant="body1">Temperature: {forecast.main.temp}°C</Typography>
                                            <Typography variant="body1">Weather: {forecast.weather[0].description}</Typography>
                                            <Typography variant="body1">Humidity: {forecast.main.humidity}%</Typography>
                                            <Typography variant="body1">Wind Speed: {forecast.wind.speed} m/s</Typography>
                                        </>
                                    } 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Container>
                )}
        </div>
    );
};

export default MainWeather;
