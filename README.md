# 🎥DRAMAKU🎥

## **📘Table of Contents📘**

1. [About Dramaku](#about-dramaku)
2. [Demo](#demo)
3. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
4. [Cara Instalasi](#cara-instalasi)
5. [Catatan](#catatan)
6. [Kontribusi](#kontribusi)
7. [Dosen pembimbing](#dosen-pembimbing)
8. [Kontak](#kontak)
9. [Lisensi](#lisensi)
10. [Institusi](#institusi)

<h2 id="about-dramaku">🦖About Dramaku🦖</h2>
Proyek ini adalah platform berbasis web yang berfungsi untuk memberikan informasi-informasi tentang film, acara TV, dan series, mirip dengan IMDB (Internet Movie Database). Aplikasi ini dirancang untuk pengguna umum, penulis ulasan (Writer), dan administrator, dengan Fitur - Fitur utama sebagai berikut:

- **Beranda/Halaman Utama:** Menampilkan semua daftar film dan acara TV populer, fitur pencarian, dan filter untuk mempermudah penelusuran konten yang akan dicari.
- **Detail Drama/Film/Acara TV:** Informasi lengkap tentang sebuah film atau acara TV, seperti sinopsis, tanggal rilis, genre, rating, daftar pemeran, dan ulasan/review pengguna.
- **Pencarian dan Filter:** Fitur untuk mencari dan memfilter konten berdasarkan judul, aktor, genre, tahun rilis, availability (platform).
- **Sistem Pendaftaran dan Login:** Registrasi sebagai pengguna terdaftar, Login sebagai admin dan pengguna terdaftar, konfirmasi email, fitur lupa/reset password, dan login dengan akun Google.
- **Manajemen Konten (CMS):** Admin dapat menambah, mengedit, mengupdate, atau menghapus drama/film, aktor, award, genre, review, dan negara.
- **Ulasan dan Rating Pengguna:** Pengguna dapat memberikan ulasan dan rating untuk konten yang mereka tonton.
- **Validasi Data:** Memvalidasi drama, ulasan, serta memblokir pengguna yang melanggar kebijakan platform.

DramaKu dirancang untuk menjadi platform referensi utama bagi para penggemar film/series/drama dengan menawarkan pengalaman pengguna yang unggul.

---

<h2 id="demo">📺Demo📺</h2>
Anda dapat mencoba aplikasi DramaKu melalui tautan berikut: https://dramaku-kel1.vercel.app/

Login Sebagai **Admin**:

- **Username: useradmin**
- **Password: useradmin**

Sebagai **Pengguna**:

Silakan mendaftar melalui menu Register menggunakan email Anda atau akun Google.

atau login menggunakan:
- **Username: useranonym** 
- **Password: useranonym**
---


<h2 id="teknologi-yang-digunakan">💻Teknologi yang Digunakan⚙️</h2>

- **Frontend:** React.js, Tailwind  
  <div style="text-align: center;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React.js" width="40" height="40">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind" width="40" height="40">
  </div>

- **Backend:** Node.js, Express.js  
  <div style="text-align: center;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" width="40" height="40">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express.js" width="40" height="40">
  </div>

- **Database:** PostgreSQL  
  <div style="text-align: center;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="PostgreSQL" width="40" height="40">
  </div>

- **Lainnya:** OAuth untuk autentikasi Google, Figma untuk desain mockup  
  <div style="text-align: center;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Oauth_logo.svg" alt="OAuth" width="40" height="40">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma" width="40" height="40">
  </div>
 
---

<h2 id="cara-instalasi">🛠 Cara Instalasi ⚙️</h2>

## Prasyarat
- **Node.js**
- **Database Engine**: PostgreSQL

## Langkah Instalasi

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

##  Cara Install dengan Docker  

1. Pastikan Docker telah terpasang di perangkat Anda.
2. Sesuaikan konfigurasi variabel DB di .env dan seeder.py.
3. Jalankan perintah berikut:
    ```bash 
    docker-compose up --build
4. Buka browser dan akses `http://localhost:8000/` untuk melihat website Dramaku.

---

<h2 id="catatan">🗒️Catatan🗒️</h2>
Website yang saat ini dikembangkan memiliki beberapa keterbatasan, terutama terkait dataset yang digunakan. Kekurangan tersebut meliputi:

- Keterbatasan Data: Dataset yang digunakan masih belum mencukupi untuk menampilkan informasi secara lengkap.
- Data Tidak Aktual: Beberapa data yang ditampilkan mungkin belum sepenuhnya mencerminkan kondisi terkini.

---

<h2 id="kontribusi">👨‍💻Kontribusi👨‍💻</h2>
<div align="center">

  <table border="0">
    <tr>
      <td align="center">
        <a href="https://github.com/KeanuRayhan">
          <img src="https://avatars.githubusercontent.com/u/117803802?v=4" width="100" alt="MahardikaPratama" style="border-radius: 50%; border: 2px solid #0000FF;" />
        </a>
        <br>
        <a href="https://github.com/KeanuRayhan" style="color:#808080; font-weight: bold; text-decoration: none;">Keanu</a>
      </td>
      <td align="center">
        <a href="https://github.com/Revandi2245">
          <img src="https://avatars.githubusercontent.com/u/117830304?v=4" width="100" alt="niqanabila16" style="border-radius: 50%; border: 2px solid #0000FF;" />
        </a>
        <br>
        <a href="https://github.com/Revandi2245" style="color:#808080; font-weight: bold; text-decoration: none;">Revandi</a>
      </td>
      <td align="center">
        <a href="https://github.com/hanifzndn">
          <img src="https://avatars.githubusercontent.com/u/117618640?v=4" width="100" alt="Contributor3" style="border-radius: 50%; border: 2px solid #0000FF;" />
        </a>
        <br>
        <a href="https://github.com/hanifzndn" style="color:#808080; font-weight: bold; text-decoration: none;">Hanif</a>
      </td>
    </tr>
  </table>
  <p style="margin-top: 20px; font-size: 16px; color: #9;">
    Terima kasih banyak kepada semua kontributor atas dedikasi dan kerja kerasnya!
  </p>
</div>

---


<h2 id="dosen-pembimbing">👩‍🏫 Dosen Pembimbing</h2>
<div align="center"> <a href="https://github.com/sriratnawulan123"> <img src="https://avatars.githubusercontent.com/u/148301780?v=4" width="120" alt="Sri Ratna Wulan" style="border-radius: 50%; border: 3px solid #4caf50;" /> </a> <p style="color:#9; font-weight: bold; font-size: 18px;">Sri Ratna Wulan</p> </div>

---

<h2 id="kontak">📱Kontak</h2>

Untuk pertanyaan atau saran, hubungi kami di:
- Email:
 1. [keanu.rayhan.tif422@polban.ac.id](mailto:keanu.rayhan.tif422@polban.ac.id)
 2. [revandi.faudiamar.tif422@polban.ac.id](mailto:revandi.faudiamar.tif422@polban.ac.id)
 3. [muhammad.hanif.tif422@polban.ac.id](mailto:muhammad.hanif.tif422@polban.ac.id)

---

<h2 id="lisensi">Lisensi</h2>
Proyek ini dilisensikan di bawah lisensi MIT. Lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.

---

<h2 id="institusi">🏢 Institusi</h2>
<div align="center">
  <img src="https://www.polban.ac.id/wp-content/uploads/2021/11/MASTER-LOGO-POLBAN-SMALL.png" height="100" alt="Polban Logo" />
</div>