import Express, { Request, Response } from "express";
import cors from "cors";
import logger from "./middleware/logging";
import fs from 'fs';

let routes: Record<string, string>;
const FILE_NAME: string = 'routes.json';

const app = Express();
const port = 2000;

// Middleware
app.use(logger);
app.use(cors());
app.use(Express.json());

app.get("/entries", (req: Request, res: Response) => {
    res.status(200).json(routes);
})

app.get('/:slug', (req: Request, res: Response) => {
    const match = routes[req.params.slug];
    if(!match) {
        res.status(404).send('Not found');
    }
    return res.redirect(302, match);
});

app.post('/:slug', (req: Request, res: Response) => {
    const slug = req.params.slug;
    const route = req.query.route;
    if(!route) {
      res.status(400).send('Missing route');
    }
    routes[slug] = route as string;
    saveFile();
    res.status(200).send('Saved');
})

app.delete('/entry/:slug', (req: Request, res: Response) => {   
    delete routes[req.params.slug];
    saveFile();
    res.status(200).send('Deleted');
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