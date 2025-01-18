import Express, { Request, Response } from "express";
import cors from "cors";

const app = Express();
const port = 3000;

// Middleware
app.use(cors());
app.use(Express.json());

app.get("/temperature", (req: Request, res: Response) => {
    const celcius =  Number(req.query.celcius as string);
    const fahrenheit = Number(req.query.fahrenheit as string);
    if(celcius) {
        const celcInFahrenheit = celcius * 9 / 5 + 32;
        res.status(200).send(celcInFahrenheit);
    } else if (fahrenheit) {
        const fahrenheitInCelcius = (fahrenheit - 32) * 5 / 9;
        res.status(200).send(fahrenheitInCelcius);
    } else {
        res.status(400).send("Please provide either a 'celcius' or 'fahrenheit' query");
    }
})


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
