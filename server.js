const app = require("./app");

const PORT = process.env.PORT || 3001;

app.listen(PORT, (err) => {
    err
        ? console.log('Error connecting server')
        : console.log(`Server listening on http://localhost:${PORT}`)
})