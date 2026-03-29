import { maskCard } from "@ekaone/mask-card";

export const maskCardTool = {
  name: "mask_card",
  description: `Masks a credit or debit card number to protect sensitive payment information.
Use when the user wants to hide, protect, or anonymize card numbers in a table, display, or logs.
Supports Visa, Mastercard, Amex, Discover, JCB, and all major card types.
Follows PCI DSS compliance by default (shows last 4 digits only).`,
  inputSchema: {
    type: "object" as const,
    properties: {
      value: {
        type: "string",
        description:
          "The card number to mask. Accepts formatted input like '4532-1234-5678-9012' or plain digits.",
      },
      maskChar: {
        type: "string",
        description: "Character used for masking. Default is '*'.",
      },
      unmaskedStart: {
        type: "number",
        description:
          "Number of digits to keep visible at the beginning. Default is 0.",
      },
      unmaskedEnd: {
        type: "number",
        description:
          "Number of digits to keep visible at the end. Default is 4.",
      },
    },
    required: ["value"],
  },
  handler: async (args: {
    value: string;
    maskChar?: string;
    unmaskedStart?: number;
    unmaskedEnd?: number;
  }) => {
    const result = maskCard(args.value, {
      maskChar: args.maskChar,
      unmaskedStart: args.unmaskedStart,
      unmaskedEnd: args.unmaskedEnd,
    });

    return {
      content: [{ type: "text" as const, text: result }],
    };
  },
};
