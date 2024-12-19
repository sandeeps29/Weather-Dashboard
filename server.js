const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Weather API endpoint
app.get('/api/weather', (req, res) => {
    const weather = {
        temperature: Math.floor(Math.random() * 30) + 10,
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)]
    };
    res.json(weather);
});

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});
