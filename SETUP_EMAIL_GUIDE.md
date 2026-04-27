<!-- SETUP GUIDE: Connect Contact Form to Email -->
<!-- signed: serozr -->

# Panduan Setup Email untuk Contact Form

Ada 3 pilihan service gratis untuk mengirim email dari website Anda:

## OPSI 1: Formspree (Recommended - Paling Mudah)

### Step 1: Daftar akun
1. Kunjungi https://formspree.io
2. Click "Sign Up" dan daftar dengan email Anda
3. Verifikasi email Anda

### Step 2: Buat form baru
1. Di dashboard Formspree, click "New Form"
2. Pilih domain Anda (atau gunakan default)
3. Copy Form ID yang diberikan (format: xxxxxx)

### Step 3: Update HTML
Ganti "YOUR_FORM_ID" di file HTML dengan Form ID Anda:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: name,
        email: email,
        message: message
    })
});
```

Contoh:
```javascript
const response = await fetch('https://formspree.io/f/xyzabc123', {
    ...
});
```

### Step 4: Test
Buka website Anda dan kirim test message. Email akan dikirim ke email yang terdaftar di Formspree.

---

## OPSI 2: EmailJS (Flexible - Untuk Advanced Users)

### Step 1: Daftar akun
1. Kunjungi https://www.emailjs.com/
2. Sign up dengan email Anda
3. Verifikasi email

### Step 2: Setup Email Service
1. Di dashboard, click "Email Services"
2. Pilih email provider (Gmail, Outlook, etc)
3. Follow setup instructions

### Step 3: Buat Email Template
1. Click "Email Templates"
2. Buat template baru dengan variables:
   - {{name}}
   - {{email}}
   - {{message}}

### Step 4: Update HTML
Tambahkan script di head:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>

<script>
    // Initialize EmailJS
    emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

Update form submission:
```javascript
emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
    name: name,
    email: email,
    message: message
}, 'YOUR_PUBLIC_KEY');
```

---

## OPSI 3: Backend API (Node.js + Express)

Untuk setup lebih advanced dengan backend sendiri:

### Install dependencies
```bash
npm install express nodemailer dotenv
```

### Create server.js
```javascript
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

app.post('/send-email', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        await transporter.sendMail({
            from: email,
            to: 'ramadhaniras@gmail.com',
            subject: `New message from ${name}`,
            text: message,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Update form to send to your API
```javascript
const response = await fetch('http://your-domain.com/send-email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: name,
        email: email,
        message: message
    })
});
```

---

## REKOMENDASI

**Untuk pemula:** Gunakan **Formspree** (paling simple, tinggal copy-paste)
**Untuk intermediate:** Gunakan **EmailJS** (lebih kontrol, UI friendly)
**Untuk advanced:** Gunakan **Backend API** (full kontrol, scalable)

---

## TROUBLESHOOTING

### Email tidak terkirim?
1. Check browser console (F12 → Console tab)
2. Verifikasi Form ID atau credentials benar
3. Check spam folder
4. Pastikan form inputs tidak kosong

### CORS Error?
- Semua opsi di atas sudah handle CORS
- Jika pakai custom API, tambahkan CORS headers

### Testing
```javascript
// Add di console browser untuk test
console.log('Name:', document.getElementById('formName').value);
console.log('Email:', document.getElementById('formEmail').value);
console.log('Message:', document.getElementById('formMessage').value);
```

---

## TIMELINE EDUCATION - Penjelasan Animasi

Di file HTML, 4 timeline items sudah ditambahkan dengan animation-delay:

```html
<!-- Item 1: no delay (0s) -->
<div class="timeline fade-in">
    <!-- content -->
</div>

<!-- Item 2: 0.2s delay -->
<div class="timeline fade-in" style="animation-delay: 0.2s;">
    <!-- content -->
</div>

<!-- Item 3: 0.4s delay -->
<div class="timeline fade-in" style="animation-delay: 0.4s;">
    <!-- content -->
</div>

<!-- Item 4: 0.6s delay -->
<div class="timeline fade-in" style="animation-delay: 0.6s;">
    <!-- content -->
</div>
```

Setiap item akan fade in dengan staggered effect.

---

## FILES YANG DIUPDATE

1. **index_updated.html** - HTML dengan form dan 4 timeline education
2. **additional_styles.css** - CSS untuk timeline dan form styling
3. **main.js** - Sudah support (tidak perlu diupdate)
4. **animations.css** - Sudah support (tidak perlu diupdate)

---

## IMPLEMENTASI

1. Copy isi dari `additional_styles.css` ke file `main.css` Anda
2. Replace `index.html` dengan `index_updated.html`
3. Pilih salah satu email service di atas dan setup
4. Update Form ID / credentials di HTML
5. Test dengan mengirim message

---

Good luck! Semoga bermanfaat 🚀

signed: serozr
