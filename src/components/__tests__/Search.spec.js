import Papa from "papaparse";
import consecutiveMatch from "../Search";
const path = require("path");
const fs = require("fs");

// Test cases categorized by type
const testCases = {
  standardMatches: [
    {
      input: "joh",
      target: "John Smith",
      expectedResult: true,
      description: "start of first name",
    },
    {
      input: "smith",
      target: "John Smith",
      expectedResult: true,
      description: "full last name",
    },
    {
      input: "ohn",
      target: "John Smith",
      expectedResult: true,
      description: "middle of name",
    },
  ],

  noMatches: [
    {
      input: "jsm",
      target: "John Smith",
      expectedResult: false,
      description: "non-consecutive letters",
    },
    {
      input: "jhn",
      target: "John Smith",
      expectedResult: false,
      description: "missing letter",
    },
    {
      input: "xyz",
      target: "John Smith",
      expectedResult: false,
      description: "no matching letters",
    },
  ],

  caseVariations: [
    {
      input: "SMITH",
      target: "John Smith",
      expectedResult: true,
      description: "uppercase input",
    },
    {
      input: "smith",
      target: "John SMITH",
      expectedResult: true,
      description: "uppercase target",
    },
    {
      input: "SMiTh",
      target: "john smith",
      expectedResult: true,
      description: "mixed case",
    },
  ],

  specialCases: [
    {
      input: "",
      target: "John Smith",
      expectedResult: false,
      description: "empty input",
    },
    {
      input: " ",
      target: "John Smith",
      expectedResult: false,
      description: "space only",
    },
    {
      input: "o'b",
      target: "John O'Brien",
      expectedResult: true,
      description: "apostrophe",
    },
    {
      input: "-sm",
      target: "John-Smith",
      expectedResult: true,
      description: "hyphenated name",
    },
  ],

  multipleMatches: [
    {
      input: "an",
      target: "Anna Hannah",
      expectedResult: true,
      description: "multiple possible matches",
    },
    {
      input: "han",
      target: "Anna Hannah",
      expectedResult: true,
      description: "match in second word",
    },
  ],
};

describe("consecutiveMatch Function", () => {
  // Standard Matches
  describe("Standard Matching Cases", () => {
    test.each(testCases.standardMatches)(
      '$description: "$input" in "$target"',
      ({ input, target, expectedResult }) => {
        expect(consecutiveMatch(input, target)).toBe(expectedResult);
      },
    );
  });

  // No Matches
  describe("Non-Matching Cases", () => {
    test.each(testCases.noMatches)(
      '$description: "$input" in "$target"',
      ({ input, target, expectedResult }) => {
        expect(consecutiveMatch(input, target)).toBe(expectedResult);
      },
    );
  });

  // Case Sensitivity
  describe("Case Sensitivity", () => {
    test.each(testCases.caseVariations)(
      '$description: "$input" in "$target"',
      ({ input, target, expectedResult }) => {
        expect(consecutiveMatch(input, target)).toBe(expectedResult);
      },
    );
  });

  // Special Cases
  describe("Special Cases", () => {
    test.each(testCases.specialCases)(
      '$description: "$input" in "$target"',
      ({ input, target, expectedResult }) => {
        expect(consecutiveMatch(input, target)).toBe(expectedResult);
      },
    );
  });

  // Multiple Matches
  describe("Multiple Match Cases", () => {
    test.each(testCases.multipleMatches)(
      '$description: "$input" in "$target"',
      ({ input, target, expectedResult }) => {
        expect(consecutiveMatch(input, target)).toBe(expectedResult);
      },
    );
  });

  // Additional Edge Cases
  describe("Edge Cases", () => {
    test("should handle inputs longer than target", () => {
      expect(consecutiveMatch("johnsmith", "John")).toBe(false);
    });

    test("should handle identical strings", () => {
      expect(consecutiveMatch("john", "john")).toBe(true);
    });

    test("should handle repeated characters", () => {
      expect(consecutiveMatch("nn", "Anna")).toBe(true);
    });
  });
});

describe("consecutiveMatch Function", () => {
  let csvTestCases = [];

  // Use done callback to ensure CSV is loaded before tests run
  beforeAll((done) => {
    try {
      const csvFilePath = path.join(__dirname, "./test_data.csv");
      const csvContent = fs.readFileSync(csvFilePath, "utf-8");

      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          csvTestCases = results.data.map((row) => ({
            input: row.input,
            target: row.target,
            expectedResult: row.expectedResult.toLowerCase() === "true",
            description: row.description || `'${row.input}' in '${row.target}'`,
          }));
          console.log(`Loaded ${csvTestCases.length} test cases from CSV`);
          done();
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          done(error);
        },
      });
    } catch (error) {
      console.error("Error loading CSV file:", error);
      done(error);
    }
  });

  // Verify CSV data is loaded
  beforeEach(() => {
    expect(csvTestCases.length).toBeGreaterThan(0);
  });

  // CSV-based tests
  describe("CSV Test Cases", () => {
    it("runs all CSV test cases", () => {
      csvTestCases.forEach(({ input, target, expectedResult, description }) => {
        const result = consecutiveMatch(input, target);
        expect(result).toBe(expectedResult);
        if (result !== expectedResult) {
          console.log(
            `Tested: ${description} - ${result === expectedResult ? "PASS" : "FAIL"}`,
          );
        }
      });
    });
  });

  // Additional edge cases not in CSV
  describe("Edge Cases", () => {
    test("should handle empty input", () => {
      expect(consecutiveMatch("", "John Smith")).toBe(false);
    });

    test("should handle whitespace input", () => {
      expect(consecutiveMatch(" ", "John Smith")).toBe(false);
    });

    test("should handle input longer than target", () => {
      expect(consecutiveMatch("johnsmith", "John")).toBe(false);
    });
  });
});
