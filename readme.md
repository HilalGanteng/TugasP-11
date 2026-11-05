# Inventaris Tanggung Jawab (Refactoring `app.js` Monolit)

Dokumen ini memetakan setiap blok kode pada berkas awal `app.js` ke dalam kelompok tanggung jawab masing-masing sebelum dipecah menjadi ES Modules.

## Tabel Pemetaan Kode

| Rentang Baris | Kelompok Tanggung Jawab | Deskripsi / Nama Variabel / Fungsi | Modul Tujuan |
| :--- | :--- | :--- | :--- |
| **Baris 5 – 6** | Data / State | Deklarasi variabel penampung data `catatan` dan `kataCari` | `src/state.js` |
| **Baris 8 – 44** | Tampilan (UI / Render) & Storage | Fungsi `render()` yang menyaring data, memanipulasi elemen DOM (`#sematan`, `#semua`, `#info`), serta menyimpan data ke `localStorage` | `src/ui.js` (DOM) & `src/storage.js` (Penyimpanan) |
| **Baris 46 – 51** | Data / State | Fungsi global `sematkan(id)` untuk mengubah status `disematkan` | `src/state.js` (`alihSemat`) |
| **Baris 53 – 61** | Data / State & Event | Fungsi global `hapus(id)` yang melakukan konfirmasi modal `confirm()` dan menghapus catatan dari data | `src/state.js` (`hapus`) & `src/main.js` (Konfirmasi `confirm`) |
| **Baris 63 – 72** | Event / Interaksi | Event listener `submit` pada elemen `#form` untuk menambah catatan baru | `src/main.js` & `src/state.js` (`tambah`) |
| **Baris 74 – 77** | Event / Interaksi | Event listener `input` pada elemen `#cari` untuk menangkap kata kunci pencarian | `src/main.js` & `src/state.js` (`cari`) |
| **Baris 79** | Inisialisasi | Eksekusi fungsi `render()` pertama kali saat aplikasi diunggah | `src/main.js` |

---

## Ringkasan Alur & Aturan Pemecahan Modul

1. **`src/storage.js`**: Mengelola pembacaan dan penulisan data murni ke `localStorage`.
2. **`src/state.js`**: Menjadi pusat pengelolaan data murni (array `catatan`). **Tidak boleh menyentuh DOM (`document`), `window`, `confirm`, `alert`, atau `localStorage` secara langsung** demi memenuhi kontrak pengujian `uji-modul.html`.
3. **`src/ui.js`**: Mengurus manipulasi DOM, pembuatan elemen HTML secara dinamis, dan penataan tampilan kartu tanpa atribut `onclick`.
4. **`src/main.js`**: Berperan sebagai titik masuk utama (*entry point*) yang menghubungkan seluruh modul, mengelola event listener (`addEventListener`), serta menangani dialog konfirmasi pengguna (`confirm`).