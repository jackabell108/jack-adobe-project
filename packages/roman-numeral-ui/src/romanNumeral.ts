export interface RomanNumeralResponse {
    input: number;
    output: string;
}

const localURI = 'http://localhost:8080/romannumeral?query='

export const getRomanNumeral = async (untranslatedInteger: number): Promise<string> => {
    try {
        //fetch data from the API
        const dataResponse = await fetch(localURI + untranslatedInteger);
        const romanNumeral: RomanNumeralResponse = await dataResponse.json();
        return romanNumeral.output;

    } catch(error) {
        console.error("Failed request with integer " + untranslatedInteger);
        console.error("Error:", error);
        return ""
    }
}