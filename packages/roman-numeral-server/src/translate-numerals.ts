export interface RomanNumeralResponse {
    input: number;
    output: string;
}

const romanTranslator: Record<string, number> = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1
}

const fives = ['D', 'L', 'V'];

/**
 * this function loops over the roman characters, decreasing the 
 * value as it goes. 
 * @param untranslatedNumeral number to be turned into roman
 * @returns roman numeral string
 */
export const translateNumerals = (untranslatedNumeral: number) => {
    //numerals with 4s go back one symbol, 9s go back two
    let skipLargestSymbol = 'M';
    let nextLargestSymbol = 'M';

    //iterate over roman numerals, adding based on integer
    return Object.entries(romanTranslator).reduce((romanNumeral, currentRomanValue) => {
        
        //start with an empty string for each pass
        let buffer = "";
        const [numeral, value] = currentRomanValue;

        //iterate number of numerals necessary. Up to 4
        while (untranslatedNumeral >= value) {
            untranslatedNumeral -= value;
            buffer += numeral
        }

        // use subtractive notation
        if (buffer.length === 4) {
            const lookBack = romanNumeral.slice(-1);

            // while 9s will be replaced by a skip with the current numeral
            // only powers of 10 can be subtracting (95 is not VC)
            // the fifth power getting replaced must be smaller than the skip
            if (fives.includes(lookBack) && romanTranslator[lookBack] < romanTranslator[skipLargestSymbol]) {
                buffer = numeral + skipLargestSymbol
                romanNumeral = romanNumeral.substring(0, romanNumeral.length - 1);
            } else {

                // IV instead of IIII
                buffer = numeral + nextLargestSymbol;
            }  
        }
        skipLargestSymbol = nextLargestSymbol;
        nextLargestSymbol = numeral;
        return romanNumeral += buffer
    }, "");
}