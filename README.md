# Roman Numerals App

This app consists of two packages, the UI and the Server. The server takes a GET request with an integer in the URL query. It returns data in the format:

```
{
    input: Integer
    output: String
}
```
The UI then displays the translated roman numeral at the bottom of the screen. The user can enter any number between 1 and 3999. If the user attempts to enter nothing, a non-number, or a number outside the acceptable range, the UI displays an error message.

The UI also responds to the default theme of the computer's setting (light mode vs dark mode). The UI components used are Adobe React Spectrum

# Build and Deploy
The easiest way to get the project running is to simply run the `build-and-deploy-all.sh` bash script. This will build the packages in separate containers and deploy them. Simply visit `http://localhost:3000/` and see the UI yourself.

Building and running for development is covered in the individual packages

# REFERENCE FOR RULES
https://solano.edu/ASTC/forms/math/Roman%20Numerals.pdf