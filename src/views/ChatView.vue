<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAuthStore } from '@/stores/auth'
import { ref, nextTick } from 'vue'

const auth = useAuthStore()
const message = ref('')
const scrollAnchor = ref<HTMLElement | null>(null)

const messages = ref([
    { id: 1, text: 'Hi! How can I help you today?', fromMe: false },
    { id: 2, text: 'What\'s the bill for March 2025?', fromMe: true },
    { id: 3, text: 'Bill summary:<br>Subscriber: 123456789<br>Month: March', fromMe: false },
])

const sendMessage = () => {
    if (message.value.trim() === '') return
    messages.value.push({ id: Date.now(), text: message.value, fromMe: true })
    message.value = ''

    nextTick(() => {
        scrollAnchor.value?.scrollIntoView({ behavior: 'smooth' })
    })
}
</script>

<template>
    <div class="flex flex-col h-screen">
        <header class="p-4 border-b flex justify-between items-center">
            <h1 class="text-lg font-semibold">Agent</h1>
            <Button variant="outline" size="sm" @click="auth.logout">Logout</Button>
        </header>

        <ScrollArea class="flex-1 p-4 space-y-2 overflow-auto">
            <div v-for="msg in messages" :key="msg.id" :class="[
                'max-w-[80%] px-4 py-2 my-2 rounded-2xl text-sm whitespace-pre-line',
                msg.fromMe
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'mr-auto bg-muted'
            ]" v-html="msg.text"></div>
            <div ref="scrollAnchor"></div>
        </ScrollArea>

        <form @submit.prevent="sendMessage" class="flex items-center gap-2 border-t p-4 bg-background">
            <Input v-model="message" placeholder="Type message..." class="flex-1" />
            <Button type="submit">Send</Button>
        </form>
    </div>
</template>
