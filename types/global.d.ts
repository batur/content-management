export {};

declare global {
  interface Content {
    id: string;
    content: string;
    createdAt: string;
    user: {
      id: string;
      username: string;
    };
  }
}
