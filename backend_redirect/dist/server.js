"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const logging_1 = __importDefault(require("./middleware/logging"));
const fs_1 = __importDefault(require("fs"));
const auth_1 = __importDefault(require("./middleware/auth"));
let routes;
const FILE_NAME = 'routes.json';
const app = (0, express_1.default)();
const port = 2000;
// Middleware
app.use(logging_1.default);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/entries", auth_1.default, (req, res) => {
    res.status(200).json(routes);
});
app.delete('/entry/:slug', auth_1.default, (req, res) => {
    delete routes[req.params.slug];
    saveFile();
    res.status(200).send('Deleted');
});
app.get('/:slug', (req, res) => {
    const match = routes[req.params.slug];
    if (!match) {
        res.status(404).send('Not found');
    }
    return res.redirect(302, match);
});
app.post('/:slug', auth_1.default, (req, res) => {
    const slug = req.params.slug;
    const route = req.query.route;
    if (!route) {
        res.status(400).send('Missing route');
    }
    routes[slug] = route;
    saveFile();
    res.status(200).send("http://localhost:2000/" + slug);
});
routes = readFromFile();
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
function saveFile() {
    fs_1.default.writeFileSync(FILE_NAME, JSON.stringify(routes, null, 2));
    console.log('Map saved to file.');
}
function readFromFile() {
    const data = fs_1.default.readFileSync(FILE_NAME, 'utf-8');
    return JSON.parse(data);
}
