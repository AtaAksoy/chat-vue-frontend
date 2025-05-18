<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/utils/api'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
    error.value = ''
    loading.value = true

    try {
        const response = await api.post('/gsm/api/v1/subscriber', {
            email: email.value,
            password: password.value,
        })

        if (response.data?.status && response.data?.data?.token) {
            const { token, subscriberNo, name, email } = response.data.data
            auth.login(token, { subscriberNo, name, email })
            router.push('/chat')
        }
    } catch (err: any) {
        error.value = err.response?.data?.message || 'Server error'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="h-screen flex items-center justify-center px-4">
        <form class="w-full max-w-sm space-y-4" @submit.prevent="handleLogin">
            <h1 class="text-xl font-bold text-center">Login to Chat</h1>

            <Input v-model="email" type="email" placeholder="Email" required />
            <Input v-model="password" type="password" placeholder="Password" required />

            <p v-if="error" class="text-sm text-red-500 text-center">{{ error }}</p>

            <Button class="w-full" type="submit" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
            </Button>
        </form>
    </div>
</template>
