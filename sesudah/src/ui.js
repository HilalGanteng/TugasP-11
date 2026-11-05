export function renderUI(hasilPencarian, semuaCatatan, onSemat, onHapus) {
  const sematanEl = document.getElementById('sematan');
  const semuaEl = document.getElementById('semua');
  const infoEl = document.getElementById('info');

  sematanEl.innerHTML = '';
  semuaEl.innerHTML = '';

  let jumlahSemat = 0;

  semuaCatatan.forEach((c) => {
    // Render kartu untuk bagian Disematkan (hanya jika disematkan dan masuk hasil pencarian)
    if (c.disematkan && hasilPencarian.includes(c)) {
      jumlahSemat++;
      sematanEl.appendChild(buatElemenKartu(c, onSemat, onHapus));
    }
  });

  // Render kartu untuk Semua Catatan (berdasarkan hasil pencarian)
  hasilPencarian.forEach((c) => {
    semuaEl.appendChild(buatElemenKartu(c, onSemat, onHapus));
  });

  if (jumlahSemat === 0) {
    sematanEl.innerHTML = '<p class="kosong">Belum ada catatan yang disematkan.</p>';
  }
  if (hasilPencarian.length === 0) {
    semuaEl.innerHTML = '<p class="kosong">Tidak ada catatan.</p>';
  }

  infoEl.textContent = `${hasilPencarian.length} catatan, ${jumlahSemat} disematkan`;
}

function buatElemenKartu(c, onSemat, onHapus) {
  const div = document.createElement('div');
  div.className = 'kartu';

  div.innerHTML = `
    <small>${c.mk}</small>
    <h3>${c.judul}</h3>
    <small>${new Date(c.dibuat).toLocaleDateString('id-ID')}</small>
    <div class="aksi">
      <button class="btn-semat">${c.disematkan ? 'Lepas' : 'Sematkan'}</button>
      <button class="btn-hapus">Hapus</button>
    </div>
  `;

  // Pasang event listener secara dinamis (menggantikan onclick string)
  div.querySelector('.btn-semat').addEventListener('click', () => onSemat(c.id));
  div.querySelector('.btn-hapus').addEventListener('click', () => onHapus(c.id));

  return div;
}