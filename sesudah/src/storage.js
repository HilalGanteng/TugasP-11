const KUNCI = 'catatan-kuliah';

export function ambilData() {
  return JSON.parse(localStorage.getItem(KUNCI)) || [];
}

export function simpanData(catatan) {
  localStorage.setItem(KUNCI, JSON.stringify(catatan));
}