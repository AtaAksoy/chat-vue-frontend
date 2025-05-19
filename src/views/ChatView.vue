<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAuthStore } from '@/stores/auth'
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import echo from '@/lib/echo'
import { onMounted } from 'vue'
import axios from "axios"
import api from '@/utils/api'

const auth = useAuthStore()
const message = ref('')
const scrollAnchor = ref<HTMLElement | null>(null)
const router = useRouter()
const isTyping = ref(false)
const canSendMessage = ref(true)

const messages = ref([
    { id: 1, text: 'Hi! How can I help you today?', fromMe: false },
])

onMounted(() => {
    const userId = auth.user?.subscriberNo
    console.log("Started listening")
    echo.channel(`chat.${userId}`).listen('.message-received', (e: any) => {
        isTyping.value = false
        canSendMessage.value = true;
        messages.value.push({
            id: Date.now(),
            text: e.message,
            fromMe: false,
        })
        nextTick(() => {
            scrollAnchor.value?.scrollIntoView({ behavior: 'smooth' })
        })
    })
})

const handleLogout = () => {
    auth.logout()
    router.push('/login')
}

const sendMessage = async () => {
    if (!message.value.trim() || !canSendMessage.value) return

    const content = message.value.trim()
    const token = auth.token
    const userId = auth.user?.subscriberNo

    messages.value.push({ id: Date.now(), text: content, fromMe: true })
    message.value = ''
    isTyping.value = true
    canSendMessage.value = false

    nextTick(() => {
        scrollAnchor.value?.scrollIntoView({ behavior: 'smooth' })
    })

    try {
        await api.post('/chat/api/v1/chat', {
            message: content,
        }, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.error('API error:', error)

        messages.value.push({
            id: Date.now(),
            text: '❗ AI assistant could not process your request. Please try again later.',
            fromMe: false,
        })

        isTyping.value = false
        canSendMessage.value = true

        nextTick(() => {
            scrollAnchor.value?.scrollIntoView({ behavior: 'smooth' })
        })
    }
}

</script>

<template>
    <div class="flex flex-col h-screen">
        <header class="p-4 border-b flex justify-between items-center">
            <h1 class="text-lg font-semibold">Agent</h1>
            <Button variant="outline" size="sm" @click="handleLogout">Logout</Button>
        </header>

        <ScrollArea class="flex-1 p-4 space-y-2 overflow-auto">
            <div v-for="msg in messages" :key="msg.id" :class="[
                'max-w-[80%] px-4 py-2 my-2 rounded-2xl text-sm whitespace-pre-line',
                msg.fromMe
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'mr-auto bg-muted'
            ]" v-html="msg.text"></div>

            <div v-if="isTyping" class="mr-auto bg-muted text-sm px-4 py-3 my-2 rounded-2xl flex gap-1">
                <span class="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                <span class="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-150"></span>
                <span class="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-300"></span>
            </div>
            <div ref="scrollAnchor"></div>
        </ScrollArea>

        <form @submit.prevent="sendMessage" class="flex items-center gap-2 border-t p-4 bg-background">
            <Input v-model="message" placeholder="Type message..." class="flex-1" />
            <Button :disabled="!canSendMessage" type="submit">Send</Button>
        </form>
    </div>
</template>
