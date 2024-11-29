import Express, { Request, Response } from "express";
import cors from "cors";
import logger from "./middleware/logging";
import todosRouter from "./routes/todos/todosRouter";

const app = Express();
const port = 2000;

// Middleware
app.use(logger);
app.use(cors());
app.use(Express.json());

// Routes
app.use("/todos", todosRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
