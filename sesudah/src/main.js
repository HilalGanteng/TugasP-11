import { semua, tambah, alihSemat, hapus, cari } from './state.js';
import { renderUI } from './ui.js';

let kataKunciAktif = '';

function perbaruiTampilan() {
  const hasil = cari(kataKunciAktif);
  renderUI(hasil, semua(), handleSemat, handleHapus);
}

function handleSemat(id) {
  alihSemat(id);
  perbaruiTampilan();
}

function handleHapus(id) {
  if (!confirm('Hapus catatan ini?')) return;
  hapus(id);
  perbaruiTampilan();
}

// Event Listener untuk Form Tambah Catatan
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const inputJudul = document.getElementById('judul');
  const inputMk = document.getElementById('mk');
  
  const judul = inputJudul.value.trim();
  if (judul === '') return;

  tambah(judul, inputMk.value);
  inputJudul.value = '';
  perbaruiTampilan();
});

// Event Listener untuk Kotak Pencarian
document.getElementById('cari').addEventListener('input', (e) => {
  kataKunciAktif = e.target.value;
  perbaruiTampilan();
});

// Render awal saat aplikasi pertama kali dimuat
perbaruiTampilan();