# Roman Numeral Server
This server has two endpoints, the main endpoint which takes an integer in a URL query and converts it into a roman numeral. The output is shaped like:
```
{
    input: integer,
    output: string
}
```

It rejects with a 400 on requests that are non-numbers, that are not present and are not in the range 1-3999.

The main logic is in the translate-numerals.ts. The logic there is based on the rules stated in https://solano.edu/ASTC/forms/math/Roman%20Numerals.pdf for reference, it uses these 5 rules:

1. If one or more letters are placed after another letter of greater value, add that amount.
2. A letter cannot be repeated more than three times.
3. If a letter is placed before another letter of greater value, subtract that amount.
4. You can only subtract powers of 10 (I, X, C).
5. You cannot subtract more than one number from another number.

# Development

Begin development by running
```
npm i
```
(assuming you have npm itself installed). Then:
```
npm start
```
This sets up the server on port 8080. you can hit the `/romannumeral?query={integer}` endpoint using postman or whatever. You will need to stop the job and rerun this command to see changes
You can run tests using
```
npm test --coverage
```
Test coverage must be at least 80% :[ or else

The other endpoint is /metrics, this logs the requests by statuscode and requested integerg
