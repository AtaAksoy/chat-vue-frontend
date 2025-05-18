import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

const token = localStorage.getItem('token') || ''

const echo = new Echo({
  broadcaster: 'pusher',
  key: 'y7pvzz4a5wl1jgnqfyyw',
  cluster: 'mt1',
  wsHost: 'localhost',
  wsPort: 6001,
  wssPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  authEndpoint: '',
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
})


export default echo
