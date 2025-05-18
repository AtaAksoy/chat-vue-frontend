<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const handleLogin = () => {
    auth.login()
}
</script>

<template>
    <div class="h-screen flex items-center justify-center px-4">
        <div class="w-full max-w-sm space-y-6 text-center">
            <h1 class="text-2xl font-semibold">Login</h1>
            <Button class="w-full" @click="handleLogin">Continue</Button>
        </div>
    </div>
</template>
