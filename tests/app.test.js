const request = require("supertest");
const app = require("../app");
const { isValidRollNo, getResult } = require("../lib");

describe("Unit tests - roll number validation and lookup", () => {
  test("accepts a valid 12-digit roll number", () => {
    expect(isValidRollNo("160123737001")).toBe(true);
  });

  test("rejects invalid roll numbers", () => {
    expect(isValidRollNo("123")).toBe(false);
    expect(isValidRollNo("abcdefghijkl")).toBe(false);
    expect(isValidRollNo(undefined)).toBe(false);
  });

  test("returns the correct result for an existing student", () => {
    const r = getResult("160123737001");
    expect(r.name).toBe("Bhargava Krishna");
    expect(r.status).toBe("PASS");
  });

  test("returns null for an unknown roll number", () => {
    expect(getResult("999999999999")).toBeNull();
  });
});

describe("API tests", () => {
  test("GET /api/result/:rollNo returns 200 for valid roll", async () => {
    const res = await request(app).get("/api/result/160123737002");
    expect(res.statusCode).toBe(200);
    expect(res.body.sgpa).toBe(9.2);
  });

  test("GET /api/result/:rollNo returns 404 for unknown roll", async () => {
    const res = await request(app).get("/api/result/999999999999");
    expect(res.statusCode).toBe(404);
  });

  test("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.body.status).toBe("ok");
  });
});
