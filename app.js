const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.send('Hey! this is Nestify');
});

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));