export {};

declare global {
  interface Contents {
    content: string;
    createdAt: string;
    user: {
      id: string;
      username: string;
    };
  }
}
