import { defineStore } from 'pinia'

interface User {
  subscriberNo: number,
  name: string,
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    tokenIssuedAt: localStorage.getItem('token_issued_at') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  }),

  actions: {
    login(token: string, user: User) {
      this.token = token
      this.user = user

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token_issued_at', Date.now().toString())
    },

    logout() {
      this.token = null
      this.tokenIssuedAt = null
      this.user = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('token_issued_at')
    },

    isAuthenticated(): boolean {
      return !!this.token
    },
  },
})
