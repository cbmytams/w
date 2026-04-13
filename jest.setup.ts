jest.mock("unified", () => ({
  unified: () => {
    const chain = {
      use: () => chain,
      process: async (input: string) => String(input),
    };
    return chain;
  },
}));

jest.mock("remark-parse", () => ({ __esModule: true, default: () => ({}) }));
jest.mock("remark-gfm", () => ({ __esModule: true, default: () => ({}) }));
jest.mock("remark-rehype", () => ({ __esModule: true, default: () => ({}) }));
jest.mock("rehype-raw", () => ({ __esModule: true, default: () => ({}) }));
jest.mock("rehype-stringify", () => ({
  __esModule: true,
  default: () => ({}),
}));
