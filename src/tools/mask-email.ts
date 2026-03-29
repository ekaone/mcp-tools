import { maskEmail } from "@ekaone/mask-email";

export const maskEmailTool = {
  name: "mask_email",
  description: `Masks an email address to protect user privacy.
Use when the user wants to hide, anonymize, or partially obscure email addresses in a table, UI, or logs.
By default shows the first 2 characters of the username and keeps the domain visible.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      email: {
        type: "string",
        description:
          "The email address to mask. Example: 'john.doe@example.com'.",
      },
      maskChar: {
        type: "string",
        description: "Character used for masking. Default is '*'.",
      },
      visibleChars: {
        type: "number",
        description:
          "Number of characters to keep visible at the beginning of the username. Default is 2.",
      },
      maskDomain: {
        type: "boolean",
        description:
          "If true, also masks the domain part after @. Default is false.",
      },
    },
    required: ["email"],
  },
  handler: async (args: {
    email: string;
    maskChar?: string;
    visibleChars?: number;
    maskDomain?: boolean;
  }) => {
    const result = maskEmail(args.email, {
      maskChar: args.maskChar,
      visibleChars: args.visibleChars,
      maskDomain: args.maskDomain,
    });

    return {
      content: [{ type: "text" as const, text: result }],
    };
  },
};
