import Express, { Request, Response } from "express";
import cors from "cors";
import logger from "./middleware/logging";
import fs from 'fs';
import authMiddleware from "./middleware/auth";

let routes: Record<string, string>;
const FILE_NAME: string = 'data/routes.json';

const app = Express();
const port = 2000;

// Middleware
app.use(logger);
app.use(cors());
app.use(Express.json());

app.get("/entries", authMiddleware, (req: Request, res: Response) => {
    res.status(200).json(routes);
})

app.delete('/entry/:slug', authMiddleware, (req: Request, res: Response) => {   
    delete routes[req.params.slug];
    saveFile();
    res.status(200).send('Deleted');
})

app.get('/:slug', (req: Request, res: Response) => {
    const match = routes[req.params.slug];
    if(!match) {
        res.status(404).send('Not found');
    }
    return res.redirect(302, match);
});

app.post('/entry', authMiddleware, (req: Request, res: Response) => {
    let slug = req.query.slug as string;
    const route = req.query.route as string;
    if(!route) {
      res.status(400).send('Missing route');
    }
    if(!slug) {
        slug = crypto.randomUUID();
    }
    routes[slug] = route;
    saveFile();
    res.status(200).send("http://localhost:2000/" + slug);
})



routes = readFromFile();
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


function saveFile() {
    fs.writeFileSync(FILE_NAME, JSON.stringify(routes, null, 2));
    console.log('Map saved to file.');
}


function readFromFile(): Record<string,string> {
    const data = fs.readFileSync(FILE_NAME, 'utf-8');
    return JSON.parse(data);
}