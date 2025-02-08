import { getRomanNumeral } from "../romanNumeral";

global.fetch = jest.fn();

describe("getRomanNumeral", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct Roman numeral when the API responds successfully", async () => {
    const mockResponse = { input: 10, output: "X" };
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await getRomanNumeral(10);
    expect(result).toBe("X");
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/romannumeral?query=10");
  });

  it("should return an empty string when the API call fails", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const result = await getRomanNumeral(10);
    expect(result).toBe("");
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/romannumeral?query=10");
  });

  it("should handle unexpected API response format gracefully", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });

    const result = await getRomanNumeral(10);
    expect(result).toBeUndefined(); // or "" depending on what you expect
  });
});
