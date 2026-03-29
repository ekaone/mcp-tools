import { describe, it, expect } from "vitest";
import { maskEmailTool } from "../src/tools/mask-email.js";

describe("mask_email tool", () => {
  it("default masking — first 2 chars visible", async () => {
    const r = await maskEmailTool.handler({ email: "john.doe@example.com" });
    expect(r.content[0].text).toBe("jo******@example.com");
  });

  it("visibleChars: 4", async () => {
    const r = await maskEmailTool.handler({
      email: "ekaone3033@gmail.com",
      visibleChars: 4,
    });
    expect(r.content[0].text).toBe("ekao******@gmail.com");
  });

  it("custom maskChar '#'", async () => {
    const r = await maskEmailTool.handler({
      email: "user@example.com",
      maskChar: "#",
    });
    expect(r.content[0].text).toBe("us##@example.com");
  });

  it("maskDomain: true", async () => {
    const r = await maskEmailTool.handler({
      email: "user@gmail.com",
      maskDomain: true,
    });
    expect(r.content[0].text).toBe("us**@g****.com");
  });

  it("visibleChars: 1", async () => {
    const r = await maskEmailTool.handler({
      email: "ekaone3033@gmail.com",
      visibleChars: 1,
    });
    expect(r.content[0].text).toBe("e*********@gmail.com");
  });

  it("combined options", async () => {
    const r = await maskEmailTool.handler({
      email: "ekaone3033@gmail.com",
      visibleChars: 3,
      maskChar: "-",
      maskDomain: true,
    });
    expect(r.content[0].text).toBe("eka-------@g----.com");
  });

  it("empty input", async () => {
    const r = await maskEmailTool.handler({ email: "" });
    expect(r.content[0].text).toBe("");
  });

  it("invalid email format", async () => {
    const r = await maskEmailTool.handler({ email: "notanemail" });
    expect(r.content[0].text).toBe("notanemail");
  });
});
