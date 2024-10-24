export {};

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}