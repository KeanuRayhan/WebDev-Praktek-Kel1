# DRAMAKU IMDB

## About DramaKu

Proyek ini adalah platform berbasis web yang berfungsi untuk memberikan informasi-informasi tentang film, acara TV, dan series, mirip dengan IMDB (Internet Movie Database). Aplikasi ini dirancang untuk pengguna umum, penulis ulasan (Writer), dan administrator, dengan fitur-fitur utama sebagai berikut:

- **Beranda/Halaman Utama:** Menampilkan semua daftar film dan acara TV populer, fitur pencarian, dan filter untuk mempermudah penelusuran konten yang akan dicari.
- **Detail Drama/Film/Acara TV:** Informasi lengkap tentang sebuah film atau acara TV, seperti sinopsis, tanggal rilis, genre, rating, daftar pemeran, dan ulasan/review pengguna.
- **Pencarian dan Filter:** Fitur untuk mencari dan memfilter konten berdasarkan judul, aktor, genre, tahun rilis, availability (platform).
- **Sistem Pendaftaran dan Login:** Registrasi sebagai pengguna terdaftar, Login sebagai admin dan pengguna terdaftar, konfirmasi email, fitur lupa/reset password, dan login dengan akun Google.
- **Manajemen Konten (CMS):** Admin dapat menambah, mengedit, mengupdate, atau menghapus drama/film, aktor, award, genre, review, dan negara.
- **Ulasan dan Rating Pengguna:** Pengguna dapat memberikan ulasan dan rating untuk konten yang mereka tonton.
- **Validasi Data:** Memvalidasi drama, ulasan, serta memblokir pengguna yang melanggar kebijakan platform.

DramaKu dirancang untuk menjadi platform referensi utama bagi para penggemar film/series/drama dengan menawarkan pengalaman pengguna yang unggul. Antarmuka yang responsif memastikan aplikasi dapat diakses dengan nyaman di berbagai perangkat, sementara navigasi intuitif memudahkan pengguna menjelajahi konten. Dengan performa yang cepat dan database yang diperbarui secara rutin, DramaKu memberikan informasi yang selalu relevan dan terkini, menjadikannya pilihan terpercaya untuk semua kebutuhan pencinta drama.

---


## Teknologi yang Digunakan

- **Frontend:** React.js, Tailwind
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Lainnya:** OAuth untuk autentikasi Google, Figma untuk desain mockup

---

## Cara Instalasi

### Prasyarat
- **Node.js**
- **Database Engine**: PostgreSQL

### Langkah Instalasi

1. Clone repository:
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name
   ```

2. Instal dependensi:
   ```bash
   npm install
   npm install multer 
   npm install react-validation
   npm install validator
   npm install gapi-script react-google-login --legacy-peer-deps
   npm install react-icons --legacy-peer-deps
   npm install nodemailer  
   ```

3. Konfigurasi file lingkungan (env):
   - Salin file `.env.example` menjadi `.env` dan sesuaikan nilai variabel.

4. Migrasi database:
   ```bash
   npm run migrate
   ```

5. Jalankan server:
   ```bash
   npm start
   ```

6. Akses aplikasi di `http://localhost:8000`.

---

## Struktur Proyek

- `/web-movie`: Kode untuk antarmuka pengguna.
- `/backend-movie`: Kode untuk API dan manajemen database.
- `/web-native`: File statis seperti gambar, CSS, dan JavaScript.

---

## Kontribusi

Kami menyambut kontribusi dari semua orang! Ikuti langkah berikut:

1. Fork repository ini.
2. Buat branch untuk fitur Anda:
   ```bash
   git checkout -b fitur-baru
   ```
3. Kirim pull request ke branch `main`.

---

## Lisensi

Proyek ini dilisensikan di bawah lisensi MIT. Lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.

---

## Kontak

Untuk pertanyaan atau saran, hubungi kami di:
- Email: [email@example.com](mailto:email@example.com)
- GitHub Issues: [Link Issues](https://github.com/username/repository-name/issues)

---

## Tautan Tambahan

- **Mockup Desain:** [Figma Project](https://www.figma.com/design/RDs6FDYyAgkza5aJHiLdtu/Untitled?node-id=0-1&t=eM1TJtghd0X8dT6t-0)
- **Repository GitHub:** [Repository](https://github.com/username/repository-name)
