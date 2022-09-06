export {};

declare global {
  interface Content {
    content: string;
    createdAt: string;
    user: {
      id: string;
      username: string;
    };
  }
}
