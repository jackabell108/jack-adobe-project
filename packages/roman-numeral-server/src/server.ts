import express, { Request, Response } from 'express';
import { RomanNumeralResponse, translateNumerals } from './translate-numerals';
import client from 'prom-client';

const app = express();
const port = 8080;

// Create a Prometheus registry
const register = new client.Registry();

// Define metrics
const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ["method", "path", "status", "query"],
});
  
// Register metrics
register.registerMetric(httpRequestCounter);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.on('finish', () => {
        httpRequestCounter.inc({
            method: req.method,
            path: req.path,
            status: res.statusCode,
            query: String(req.query.query)
        }) 
    });
    next();
});


app.get('/romannumeral', (req: Request, res: Response) => {

    //pull from query string
    const { query } = req.query;
    const untranslatedNumeral = parseInt(query as string);

    //number must be integer
    if (!Number.isInteger(untranslatedNumeral)) {
        res.status(400).send({
            statusCode: 400,
            error: "Invalid type"
        });
        return;
    }

    //number must be in range
    if (untranslatedNumeral < 1 || untranslatedNumeral > 3999) {
        res.status(400).send({
            statusCode: 400,
            error: "Integer not in range"
        });
        return;
    }
    try {
        const romanNumeral = translateNumerals(untranslatedNumeral);
        res.send({
            input: untranslatedNumeral,
            output: romanNumeral
        } as RomanNumeralResponse);
    } catch (error: any) {
        res.status(500).send({
            statusCode: 500,
            error: error.message
        })
    }
});

app.get('/metrics', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

export default app; // <-- Add this so tests can import the app
