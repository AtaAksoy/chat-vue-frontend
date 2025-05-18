import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const router = useRouter()

  const login = () => {
    isAuthenticated.value = true
    router.push('/chat')
  }

  const logout = () => {
    isAuthenticated.value = false
    router.push('/login')
  }

  return { isAuthenticated, login, logout }
})