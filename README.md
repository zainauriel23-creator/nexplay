# NexPlay — UI Prototype

Prototype frontend NexPlay berdasarkan flow yang dibahas:
Home → Explore → Detail Game → Pilih Server → Loading → Onboarding Game → Main Sekarang.
Flow pendukung: Library, Wishlist, Profile, pengaturan, FAQ, dan simulasi Top Up.

## Menjalankan project

1. Install Node.js 20.9+.
2. Extract ZIP.
3. Buka folder project di terminal.
4. Jalankan:

```bash
npm install
npm run dev
```

5. Buka http://localhost:3000

Untuk production build:

```bash
npm run build
npm start
```

## Catatan penting

- Ini adalah frontend prototype interaktif dengan data dummy.
- Pilihan server, katalog, library, wishlist, navigasi, dan beberapa form berjalan di sisi frontend.
- Loading dan sesi bermain adalah simulasi UI. Tombol **Main Sekarang** tidak mengunduh game, sesuai konsep instant play NexPlay.
- Agar game sungguhan bisa dimainkan tanpa instalasi manual, backend harus terhubung ke penyedia cloud gaming/game streaming resmi. Prototype ini belum membuat koneksi tersebut.
- Top Up hanya simulasi antarmuka. Belum ada payment gateway, pemrosesan transaksi, atau penyimpanan akun sungguhan.
- Login, notifikasi, dan pengaturan akun masih demo; jangan gunakan data/password asli.
- Cover game menggunakan ilustrasi gradien dan teks sementara, bukan artwork resmi game.

## Struktur

```text
nexplay/
├── app/
│   ├── globals.css        # seluruh styling (custom CSS)
│   ├── layout.tsx          # root layout & metadata
│   └── page.tsx            # komponen utama & routing state
├── components/
│   ├── Cover.tsx           # cover game (gradien + inisial)
│   ├── Empty.tsx           # empty state
│   ├── GameCard.tsx        # kartu game di grid
│   ├── LibraryRow.tsx      # baris game di library
│   ├── PageHeading.tsx     # judul halaman
│   └── SubPage.tsx         # sub-halaman dengan tombol kembali
├── lib/
│   ├── data.ts             # data dummy (games, kategori, server, FAQ)
│   └── types.ts            # tipe Game & Page
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```
