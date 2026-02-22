# ✦ SANN404 Finance - Modern Open Source Finance Tracker

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Dark_Mode-38B2AC?style=for-the-badge&logo=tailwind-css)
![PWA](https://img.shields.io/badge/PWA-Supported-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)

Aplikasi manajemen keuangan tingkat lanjut dengan UI/UX kelas atas bergaya **Ultra Clean Minimalist Dark (Matte Black & Solid Lime)**. Dirancang dengan konsep *Mobile-First*, memberikan pengalaman mulus layaknya aplikasi *native*.

Project ini adalah proyek **Open Source** yang berfokus pada privasi pengguna (Privacy-First). Tanpa memerlukan konfigurasi *backend* server, semua data disimpan secara lokal menggunakan IndexedDB. Sangat cocok digunakan untuk mengelola keuangan pribadi secara *offline* dan aman.

---

## ✨ Fitur Utama

* **📱 Native-Like Experience (Split-Scroll):** Layout pintar dengan *Header* dan *Bottom Navigation* yang *fixed*, sementara hanya daftar konten yang bergulir.
* **🎯 Target Tabungan (Wishlist):** Buat impian menjadi nyata! Tambahkan target, unggah foto/sampul kustom (Otomatis konversi ke Base64), dan pantau persentase *progress* tabungan secara interaktif.
* **📊 Analisis Real-time (Combo Chart):** Visualisasi data canggih memadukan *Bar Chart* (Pengeluaran) dan *Line Chart* (Pemasukan) menggunakan Recharts.
* **🔒 Privacy-First Storage (IndexedDB):** Data 100% tersimpan aman di *browser* perangkat pengguna. Tidak ada data sensitif yang dikirim ke server luar.
* **⚡ PWA (Progressive Web App):** Dilengkapi dengan `manifest.json`. Pengguna dapat meng-install aplikasi ini langsung ke *Homescreen* HP mereka.
* **🌙 Premium Dark UI:** Menggunakan palet warna kelas industri (`Zinc-950` untuk latar belakang, dan `Lime #D9F154` untuk aksen utama).

---

## 🛠️ Tech Stack

Aplikasi ini dibangun menggunakan ekosistem *modern web* terbaru:
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Database/Storage:** IndexedDB (via package `idb`)
* **Data Visualization:** Recharts
* **Icons:** Lucide React

---

## 📂 Struktur Repositori

```text
finance-tracker/
├── app/                      # Layout utama & Routing Next.js
├── components/               # Komponen Modular UI (Reusable)
│   ├── Profile/              # Halaman Profil User
│   ├── Wishlist/             # Sistem Target Tabungan & Modal
│   └── ...                   # Komponen utama (Header, Nav, Charts)
├── lib/                      # Konfigurasi Database IndexedDB & Helper Fungsi
├── public/                   # File Statis & Manifest PWA
├── types/                    # Definisi Interface & Tipe TypeScript 
└── tailwind.config.ts        # Setup Tema Warna (Matte Black & Lime)

