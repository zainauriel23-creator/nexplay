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
```

5. Setup database MySQL (XAMPP atau instal MySQL manual), lalu jalankan:

```bash
npx prisma db push     # buat tabel
npx prisma db seed     # isi data dummy (opsional)
```

6. Jalankan dev server:

```bash
npm run dev
```

7. Buka http://localhost:3000

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
│   ├── api/                  # API routes (Prisma → MySQL)
│   │   ├── games/
│   │   │   ├── route.ts      # GET /api/games
│   │   │   └── [id]/route.ts # GET /api/games/:id
│   │   ├── library/route.ts  # GET/POST/DELETE /api/library
│   │   └── wishlist/route.ts # GET/POST/DELETE /api/wishlist
│   ├── globals.css           # seluruh styling (custom CSS)
│   ├── layout.tsx            # root layout & metadata
│   └── page.tsx             # komponen utama & routing state
├── components/
│   ├── Cover.tsx            # cover game (gradien + inisial)
│   ├── Empty.tsx            # empty state
│   ├── GameCard.tsx          # kartu game di grid
│   ├── LibraryRow.tsx        # baris game di library
│   ├── PageHeading.tsx       # judul halaman
│   └── SubPage.tsx           # sub-halaman dengan tombol kembali
├── lib/
│   ├── data.ts              # data statis (kategori, server, FAQ)
│   ├── prisma.ts            # Prisma client singleton
│   └── types.ts              # tipe Game & Page
├── prisma/
│   ├── schema.prisma        # skema database (MySQL)
│   └── seed.cjs              # script seeding data dummy
├── .env                     # DATABASE_URL (TIDAK di-commit)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Database

Project menggunakan MySQL (via XAMPP/standalone) dengan Prisma ORM sebagai layer akses data.

- **Connection string**: `DATABASE_URL` di file `.env` (tidak di-commit ke git)
- **Schema**: `prisma/schema.prisma` — model Game, User, LibraryItem, WishlistItem, TopupTransaction
- **Seed**: `prisma/seed.cjs` — mengisi 8 game, 1 demo user, 4 library items, 1 wishlist item
- **API routes**: server-side, terhubung ke MySQL via Prisma client
