import { translateNumerals } from "../src/translate-numerals";

describe("translateNumerals", () => {
    test("converts basic numbers correctly", () => {
        expect(translateNumerals(1)).toBe("I");
        expect(translateNumerals(5)).toBe("V");
        expect(translateNumerals(10)).toBe("X");
        expect(translateNumerals(50)).toBe("L");
        expect(translateNumerals(100)).toBe("C");
        expect(translateNumerals(500)).toBe("D");
        expect(translateNumerals(1000)).toBe("M");
    });

    test("converts numbers with subtractive notation", () => {
        expect(translateNumerals(4)).toBe("IV");  // 4 = IV, not IIII
        expect(translateNumerals(9)).toBe("IX");  // 9 = IX, not VIIII
        expect(translateNumerals(40)).toBe("XL"); // 40 = XL, not XXXX
        expect(translateNumerals(90)).toBe("XC"); // 90 = XC, not LXXXX
        expect(translateNumerals(400)).toBe("CD"); // 400 = CD, not CCCC
        expect(translateNumerals(900)).toBe("CM"); // 900 = CM, not DCCCC
    });

    test("converts complex numbers", () => {
        expect(translateNumerals(14)).toBe("XIV"); 
        expect(translateNumerals(44)).toBe("XLIV"); 
        expect(translateNumerals(99)).toBe("XCIX"); 
        expect(translateNumerals(444)).toBe("CDXLIV"); 
        expect(translateNumerals(999)).toBe("CMXCIX"); 
        expect(translateNumerals(2024)).toBe("MMXXIV"); 
        expect(translateNumerals(3999)).toBe("MMMCMXCIX"); // Max valid Roman numeral
    });

    test("handles edge cases", () => {
        expect(translateNumerals(0)).toBe(""); // No Roman numeral for 0
        expect(translateNumerals(-1)).toBe(""); // No negative numbers
    });
});