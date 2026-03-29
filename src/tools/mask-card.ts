import { maskCard } from "@ekaone/mask-card";
import { z } from "zod";

export const maskCardTool = {
  name: "mask_card",
  description: `Masks a credit or debit card number to protect sensitive payment information.
Use when the user wants to hide, protect, or anonymize card numbers in a table, display, or logs.
Supports Visa, Mastercard, Amex, Discover, JCB, and all major card types.
Follows PCI DSS compliance by default (shows last 4 digits only).`,
  inputSchema: {
    value: z
      .string()
      .describe(
        "The card number to mask. Accepts formatted input like '4532-1234-5678-9012' or plain digits.",
      ),
    maskChar: z
      .string()
      .optional()
      .describe("Character used for masking. Default is '*'."),
    unmaskedStart: z
      .number()
      .optional()
      .describe(
        "Number of digits to keep visible at the beginning. Default is 0.",
      ),
    unmaskedEnd: z
      .number()
      .optional()
      .describe("Number of digits to keep visible at the end. Default is 4."),
  },
  handler: async (args: any, extra: any) => {
    const options: any = {};
    if (args.maskChar !== undefined) options.maskChar = args.maskChar;
    if (args.unmaskedStart !== undefined)
      options.unmaskedStart = args.unmaskedStart;
    if (args.unmaskedEnd !== undefined) options.unmaskedEnd = args.unmaskedEnd;

    const result = maskCard(args.value, options);

    return {
      content: [{ type: "text" as const, text: result }],
    };
  },
};
