import axios from 'axios';
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const MainWeather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [weatherForecast, setWeatherForecast] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const getWeather = async () => {
        if (!city.trim()) return;
        setLoading(true); // Start loading
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f66d9727501911f62c328508b94c5e3e&units=metric`;
        try {
            const response = await axios.get(url);
            setWeather(response.data);
            setError('');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError("No data found, please enter a valid name.");
            } else {
                setError("Error fetching weather data.");
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const getWeatherForecast = async () => {
        if (!city.trim()) return;
        setLoading(true); // Start loading
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f66d9727501911f62c328508b94c5e3e&units=metric`;
        try {
            const response = await axios.get(url);
            const forecastData = response.data.list.filter((_, index) => index % 8 === 0);
            setWeatherForecast(forecastData);
            setError('');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError("No data found, please enter a valid name.");
            } else {
                setError("Error fetching forecast data.");
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleSearch = () => {
        setWeather(null);
        setWeatherForecast(null);
        setError('');
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

            {/* Display "please wait" message while loading */}
            {loading && (
                <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px', gap: '10px' }}>
                    <CircularProgress style={{ marginTop: '20px' }} />
                    <Typography variant="body1" color="textSecondary" style={{ marginTop: '20px' }}>
                        Please wait some time...
                    </Typography>
                </Grid>
            )}

            {/* Display initial instruction message if there's no data */}
            {!weather && !weatherForecast && !error && !loading && (
                <Typography variant="body1" color="textSecondary" style={{ marginTop: '20px' }}>
                    Write any city name to get proper weather data.
                </Typography>
            )}

            {/* Display error message if there is one */}
            {error && (
                <Typography variant="body1" color="error" style={{ marginTop: '20px' }}>
                    {error}
                </Typography>
            )}

            {weather && (
                <Container>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            {weather.weather && weather.weather[0] && weather.weather[0].icon && (
                                <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon" />
                            )}
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
