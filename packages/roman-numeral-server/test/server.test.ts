import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/server'; // Add .js extension if using ESM
import * as translator from "../src/translate-numerals"; 

describe('Roman Numeral API', () => {
    test('should return a valid Roman numeral for a valid query', async () => {
        const response = await request(app).get('/romannumeral?query=10');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ input: 10, output: 'X' });
    });

    test('should return an error for a non-integer query', async () => {
        const response = await request(app).get('/romannumeral?query=abc');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ statusCode: 400, error: 'Invalid type' });
    });

    test('should return an error for numbers out of range', async () => {
        const response = await request(app).get('/romannumeral?query=4000');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ statusCode: 400, error: 'Integer not in range' });
    });

    test('should return Prometheus metrics', async () => {
        const response = await request(app).get('/metrics');
        expect(response.status).toBe(200);
        expect(response.text).toContain('http_requests_total');
    });

    test("returns 500 when translateNumerals throws an error", async () => {
        // Mock translateNumerals to throw an error
        jest.spyOn(translator, "translateNumerals").mockImplementation(() => {
            throw new Error("Unexpected error");
        });

        const response = await request(app).get("/romannumeral?query=10");
        
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            statusCode: 500,
            error: "Unexpected error",
        });

        jest.restoreAllMocks(); // Reset mock after test
    });
});
