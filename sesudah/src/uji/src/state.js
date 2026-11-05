import { ambilData, simpanData } from './storage.js';

let catatan = ambilData();

export function semua() {
  return catatan;
}

export function tambah(judul, mk) {
  const baru = {
    id: Date.now(),
    judul: judul,
    mk: mk,
    dibuat: new Date().toISOString(),
    disematkan: false
  };
  catatan.push(baru);
  simpanData(catatan);
}

export function alihSemat(id) {
  for (let i = 0; i < catatan.length; i++) {
    if (catatan[i].id === id) {
      catatan[i].disematkan = !catatan[i].disematkan;
    }
  }
  simpanData(catatan);
}

export function hapus(id) {
  catatan = catatan.filter((c) => c.id !== id);
  simpanData(catatan);
}

export function cari(kata) {
  const keyword = kata.toLowerCase();
  return catatan.filter((c) => c.judul.toLowerCase().includes(keyword));
}