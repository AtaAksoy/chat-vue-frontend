# Vue Chat App (LLM Assistant)

Bu proje, Vue 3 + Pinia + ShadCN + Tailwind CSS kullanılarak geliştirilmiş bir mobil öncelikli AI destekli sohbet uygulamasıdır.  
Kullanıcılar mesaj gönderebilir, mesajlara OpenAI tabanlı yanıtlar alabilir ve Reverb (WebSocket) ile canlı güncellemeler yapılabilir.

---

## 🚀 Özellikler

- Vue 3 + Composition API
- TypeScript ile yazılmıştır
- Tailwind CSS + ShadCN bileşenleri
- Pinia ile global auth yönetimi
- Vue Router ile oturum kontrolü
- Reverb üzerinden gerçek zamanlı mesajlaşma

---

## 📁 Klasör Yapısı

```
chat-vue-frontend/
├── src/
│   ├── components/
│   ├── views/
│   ├── stores/
│   └── main.ts
├── public/
├── .env.example
├── index.html
└── vite.config.ts
```

---

## ⚙️ Ortam Değişkenleri (.env)

`.env.example` dosyasını `.env` olarak kopyalayın ve API endpoint adresini düzenleyin:

```bash
cp .env.example .env
```

### .env.example içeriği:

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 🧪 Geliştirme Ortamı

### Gerekli Kurulumlar:

```bash
npm install
```

### Geliştirme Sunucusu:

```bash
npm run dev
```

Uygulama: [http://localhost:5173](http://localhost:5173)

---

## 📦 Build Almak

```bash
npm run build
```

Çıktı `dist/` klasörüne yazılır. Bir Nginx sunucusu altında dağıtılabilir.

---

## 🌐 Yayınlama için Nginx Örneği

```nginx
server {
    listen 80;
    server_name chat.domain.com;

    root /var/www/chat-vue-frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🔐 Auth Mekanizması

- Kullanıcı token’ı `localStorage` içinde tutulur
- Auth bilgisi `Pinia` store’da takip edilir
- Eğer token yoksa, kullanıcı `/login` sayfasına yönlendirilir

---

## 🧩 WebSocket (Reverb)

- Laravel Reverb servisi üzerinden private channel bağlantısı yapılır
- Kullanıcı ID’sine göre `chat.{userId}` kanalına bağlanır
- Yeni mesajlar `.message-received` event’i ile otomatik olarak eklenir