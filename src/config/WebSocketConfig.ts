import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY, // TODO: fix this
  wsHost: "localhost",
  wsPort: 8080,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
  disableStats: true
});

export default echo;
