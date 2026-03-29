import { describe, it, expect } from "vitest";
import { maskCardTool } from "../src/tools/mask-card.js";

describe("mask_card tool", () => {
  it("default masking — last 4 visible", async () => {
    const r = await maskCardTool.handler({ value: "4532123456789012" });
    expect(r.content[0].text).toBe("************9012");
  });

  it("strips formatting", async () => {
    const r = await maskCardTool.handler({ value: "4532-1234-5678-9012" });
    expect(r.content[0].text).toBe("************9012");
  });

  it("custom maskChar '•'", async () => {
    const r = await maskCardTool.handler({
      value: "4532123456789012",
      maskChar: "•",
    });
    expect(r.content[0].text).toBe("••••••••••••9012");
  });

  it("unmaskedStart: 4", async () => {
    const r = await maskCardTool.handler({
      value: "4532123456789012",
      unmaskedStart: 4,
    });
    expect(r.content[0].text).toBe("4532********9012");
  });

  it("unmaskedEnd: 6", async () => {
    const r = await maskCardTool.handler({
      value: "4532123456789012",
      unmaskedEnd: 6,
    });
    expect(r.content[0].text).toBe("**********789012");
  });

  it("fully hidden", async () => {
    const r = await maskCardTool.handler({
      value: "4532123456789012",
      unmaskedStart: 0,
      unmaskedEnd: 0,
    });
    expect(r.content[0].text).toBe("****************");
  });

  it("Amex 15 digits", async () => {
    const r = await maskCardTool.handler({ value: "378282246310005" });
    expect(r.content[0].text).toBe("***********0005");
  });

  it("empty input", async () => {
    const r = await maskCardTool.handler({ value: "" });
    expect(r.content[0].text).toBe("");
  });
});
