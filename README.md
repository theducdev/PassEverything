# Pass Đồ Full-Stack App

Ứng dụng full-stack hiển thị danh sách bài viết pass đồ, bao gồm API Node.js và frontend React.

## Cấu trúc thư mục

```
.
├── client/   # React + Vite + Tailwind UI
├── server/   # Express API + PostgreSQL
├── docker-compose.yml
└── README.md
```

## Yêu cầu môi trường

- Docker & Docker Compose (khuyến nghị)
- Hoặc Node.js 20+, PostgreSQL 15+

## Chạy bằng Docker Compose

```bash
docker-compose up --build
```

Sau khi khởi động:

- API: http://localhost:5000/api/posts
- Frontend: http://localhost:5173

CSDL sẽ tự động migrate + seed dữ liệu mẫu khi container server khởi chạy.

## Chạy thủ công (không dùng Docker)

### Backend

```bash
cd server
npm install
export DATABASE_URL="postgres://postgres:postgres@localhost:5432/pass_app"
export PORT=5000
npm run migrate
npm run seed
npm run dev
```

### Frontend

```bash
cd client
npm install
export CLIENT_PORT=5173
npm run dev -- --host 0.0.0.0 --port $CLIENT_PORT
```

Mặc định frontend proxy các request `/api` tới `http://localhost:5000`.

## Database

- Migration SQL: `server/migrations/001_create_posts.sql`
- Seed SQL: `server/seeds/posts_seed.sql`

Chạy lại seed sẽ reset dữ liệu (`TRUNCATE`).

## Kiểm thử nhanh

```bash
curl "http://localhost:5000/api/posts?page=1&limit=5&q=áo&category=giày&sort=likes_desc"
```

Sử dụng Chrome DevTools để kiểm tra responsive (mobile, tablet, desktop).

## Scripts

- `server`: `npm run migrate`, `npm run seed`, `npm run dev`, `npm start`
- `client`: `npm run dev`, `npm run build`, `npm run preview`
