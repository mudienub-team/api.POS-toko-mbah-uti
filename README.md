# API - POS Ritel Toko Mbah Uti Setro

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL (Supabase)
- **Environment:** dotenv
- **Code Quality:** ESLint
- **Testing:** Vitest + Supertest

## Project Structure

```text
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   ├── env.ts        # validasi environment variable (zod)
│   │   ├── index.ts      # objek config terpusat
│   │   └── database.ts   # koneksi Prisma + PostgreSQL
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── config/
│   ├── app.test.ts
│   └── setup.ts
├── .env.example
├── vitest.config.ts
└── package.json
```

## Development Guidelines

- Pisahkan routing, controller, dan business logic.
- Gunakan environment variables untuk konfigurasi sensitif.
- Gunakan Prisma untuk interaksi database.
- Terapkan validasi request pada endpoint API.
- Jalankan ESLint sebelum melakukan commit.
- Gunakan format commit yang konsisten.

## Setup

1. Salin `.env.example` menjadi `.env`, lalu isi `DATABASE_URL` PostgreSQL/Supabase Anda.
2. Tambahkan model pada `prisma/schema.prisma`.
3. Buat migrasi awal: `npm run prisma:migrate -- --name init`.
4. Jalankan API dalam mode development: `npm run dev`.

Server akan berhenti dengan pesan error jika `DATABASE_URL` kosong/tidak valid atau database tidak dapat dijangkau. Cek status lewat `GET /api/health`.

Test: `npm test` (sekali jalan), `npm run test:watch`, `npm run test:coverage`. Test tidak memakai database sungguhan.

Perintah yang tersedia: `npm run typecheck`, `npm run build`, `npm start`, dan `npm run prisma:generate`.

## Git Workflow & Commit Convention

### Branch Naming

Gunakan format berikut untuk penamaan branch:

```text
<type>/<issue-number>-<description>
```

Contoh:

```text
feature/2-login
fix/8-invalid-user-id
chore/10-update-dependencies
```

Jenis branch:

| Type       | Description                    |
| ---------- | ------------------------------ |
| `feature`  | Pengembangan fitur baru        |
| `fix`      | Perbaikan bug                  |
| `hotfix`   | Perbaikan bug mendesak         |
| `refactor` | Refactoring kode               |
| `chore`    | Konfigurasi dan maintenance    |
| `docs`     | Perubahan dokumentasi          |
| `test`     | Penambahan atau perbaikan test |

### Commit Message

Gunakan format Conventional Commits dengan menyertakan nomor issue:

```text
<type>: <description> #<issue-number>
```

Contoh:

```bash
git commit -m "feat: add login endpoint #2"
git commit -m "fix: handle invalid user id #8"
git commit -m "chore: update dependencies #10"
git commit -m "docs: update API documentation #12"
```

Ketentuan:

- Gunakan huruf kecil untuk type.
- Gunakan deskripsi singkat dan jelas.
- Gunakan bahasa Inggris secara konsisten.
- Selalu sertakan nomor issue yang relevan.
- Satu commit sebaiknya merepresentasikan satu perubahan logis.

### Merge Commit

Jika melakukan merge branch secara lokal, sertakan nomor issue pada pesan merge.

Format:

```text
merge: <description> (#<issue-number>)
```

Contoh:

```bash
git merge feature/2-login --no-ff -m "merge: add login feature (#2)"
git merge fix/8-invalid-user-id --no-ff -m "merge: fix invalid user id (#8)"
```

Gunakan `--no-ff` jika ingin mempertahankan riwayat merge sebagai merge commit.

### Pull Request

- Buat Pull Request dari feature branch menuju branch `dev`.
- Hubungkan Pull Request dengan issue terkait.
- Gunakan `Closes #<issue-number>` pada deskripsi Pull Request agar issue otomatis ditutup ketika perubahan digabungkan ke default branch.
- Pastikan perubahan sudah diperiksa dan tidak memiliki konflik sebelum merge.

Contoh deskripsi Pull Request:

```text
## Summary
- Add login endpoint
- Implement authentication logic

Closes #2
```

---

**Note:** This project is currently under development.
