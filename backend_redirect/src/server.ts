import Express, { Request, Response } from "express";
import cors from "cors";
import logger from "./middleware/logging";
import routesJSON from "./routes.json"


const routes = routesJSON as Record<string, string>;

const app = Express();
const port = 2000;

// Middleware
app.use(logger);
app.use(cors());
app.use(Express.json());

app.get('/:slug', (req: Request, res: Response) => {
    const match = routes[req.params.slug];
    if(!match) {
        res.status(404).send('Not found');
    }
    return res.redirect(302, match);
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
