export const emailConfig = {
  rules: [
    {
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Please enter a valid email!",
    },
    {
      required: true,
      message: "Please enter your email!",
    },
  ],
};

export const dateConfig = {
  rules: [
    {
      type: "object" as const,
      required: true,
      message: "Please select time!",
    },
  ],
};

export const fullNameConfig = {
  rules: [
    {
      required: true,
      message: "Please enter your full name!",
    },
  ],
};
