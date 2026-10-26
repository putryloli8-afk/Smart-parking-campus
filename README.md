# Smart Parking — UPI Kampus Tasikmalaya

Website dashboard Smart Parking dengan halaman login demo, halaman Dashboard, Data Parkir, Riwayat, Pengaturan, dan Profil. Project mempertahankan file HTML desain yang sudah ada dan menambahkan stylesheet global bersama.

## Struktur file

- `index.html` — halaman awal; mengarahkan ke Login.
- `login.html` — login demo dan pemilihan peran.
- `smart_parking_dashboard.html` — dashboard utama.
- `data-parkir.html` — detail data parkir.
- `riwayat.html` — riwayat pemantauan.
- `pengaturan.html` — pengaturan.
- `profil.html` — halaman profil.
- `global.css` — aturan global bersama.
- `auth.js` — penjagaan halaman demo, label pengguna, dan logout.
- `smart-parking.js` — helper sumber data dummy/API.
- `server-example.js` — contoh API lokal Express.
- `logo-parking.svg` — logo lokal.

## Menjalankan secara lokal

### Tampilan web
1. Buka folder ini di VS Code.
2. Install extension **Live Server**.
3. Klik kanan `index.html` atau `login.html` → **Open with Live Server**.
4. Login dengan akun demo di bawah.

### Akun demo
- Petugas Parkir: `petugas` / `petugas123`
- Wadir: `wadir` / `wadir123`

### API lokal (opsional)
Perlu Node.js. Di terminal pada folder project jalankan:
```bash
npm install
node server-example.js
```
API: `http://localhost:3000/api/parking`

Untuk memakai API, ubah sumber data menjadi `IoT API` pada pengaturan jika halaman tersebut sudah memiliki kontrol sumber data. Data dari `server-example.js` masih data contoh, bukan data sensor asli.

## Deploy ke GitHub Pages
1. Buat repository GitHub baru.
2. Upload seluruh isi folder ini ke root repository (jangan upload ZIP saja).
3. Buka **Settings → Pages**.
4. Pada Build and deployment, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu Save.
5. Tunggu proses deployment selesai dan buka URL GitHub Pages.

## Catatan keamanan dan integrasi
Login ini hanya untuk demo front-end: akun diperiksa oleh JavaScript browser dan data sesi disimpan di `localStorage`. Jangan gunakan untuk melindungi data sensitif atau produksi. Untuk autentikasi nyata diperlukan backend, password hashing, sesi/token, dan validasi hak akses di server. `localhost` hanya bisa diakses dari komputer sendiri; API perlu di-host agar dapat digunakan oleh website yang dipublikasikan.
