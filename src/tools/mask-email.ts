// mask-email.ts
import { maskEmail } from "@ekaone/mask-email";
import { z } from "zod";

const maskEmailSchema = z.object({
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
    .describe("If true, also masks the domain part after @. Default is false."),
});

type MaskEmailArgs = z.infer<typeof maskEmailSchema>;

export const maskEmailTool = {
  name: "mask_email",
  description: `Masks an email address to protect user privacy.
Use when the user wants to hide, anonymize, or partially obscure email addresses in a table, UI, or logs.
By default shows the first 2 characters of the username and keeps the domain visible.`,
  inputSchema: maskEmailSchema.shape,
  handler: async (args: MaskEmailArgs) => {
    const result = maskEmail(args.email, {
      ...(args.maskChar !== undefined && { maskChar: args.maskChar }),
      ...(args.visibleChars !== undefined && {
        visibleChars: args.visibleChars,
      }),
      ...(args.maskDomain !== undefined && { maskDomain: args.maskDomain }),
    });

    return {
      content: [{ type: "text" as const, text: result }],
    };
  },
};
