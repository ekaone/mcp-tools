import { maskEmail } from "@ekaone/mask-email";
import { z } from "zod";

export const maskEmailTool = {
  name: "mask_email",
  description: `Masks an email address to protect user privacy.
Use when the user wants to hide, anonymize, or partially obscure email addresses in a table, UI, or logs.
By default shows the first 2 characters of the username and keeps the domain visible.`,
  inputSchema: {
    email: z
      .string()
      .describe("The email address to mask. Example: 'john.doe@example.com'."),
    maskChar: z
      .string()
      .optional()
      .describe("Character used for masking. Default is '*'."),
    visibleChars: z
      .number()
      .optional()
      .describe(
        "Number of characters to keep visible at the beginning of the username. Default is 2.",
      ),
    maskDomain: z
      .boolean()
      .optional()
      .describe(
        "If true, also masks the domain part after @. Default is false.",
      ),
  },
  handler: async (args: any, extra: any) => {
    const options: any = {};
    if (args.maskChar !== undefined) options.maskChar = args.maskChar;
    if (args.visibleChars !== undefined)
      options.visibleChars = args.visibleChars;
    if (args.maskDomain !== undefined) options.maskDomain = args.maskDomain;

    const result = maskEmail(args.email, options);

    return {
      content: [{ type: "text" as const, text: result }],
    };
  },
};
