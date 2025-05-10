# TesTopia Backend

Backend Node.js + Express + MongoDB Atlas for TesTopia online exam platform.

## Setup

```bash
git clone <repo>
cd TesTopia_backend
cp .env.example .env   # edit variables
npm install
npm run dev            # with nodemon
```

Required environment variables:

- `PORT` : Port to run server (default 5000)
- `MONGODB_URI` : MongoDB Atlas connection string
- `JWT_SECRET` : Secret for JWT tokens

## API Overview

| Method | Endpoint | Auth | Description |
| ------ | -------- | ---- | ----------- |
| POST   | /api/auth/register | no | Register student or teacher (`role` field) |
| POST   | /api/auth/login | no | Login, receive JWT |
| GET    | /api/teacher/exams | Teacher | List my exams |
| POST   | /api/teacher/exams | Teacher | Create exam |
| PUT    | /api/teacher/exams/:examId | Teacher | Update exam |
| DELETE | /api/teacher/exams/:examId | Teacher | Delete exam |
| GET    | /api/teacher/exams/:examId/results | Teacher | View results |
| GET    | /api/student/exams | no | List public exams |
| GET    | /api/student/exams/:link | no | Get one exam by link |
| POST   | /api/student/exams/:link/submit | Student | Submit answers |
| GET    | /api/student/results | Student | My results |

All protected routes require `Authorization: Bearer <token>` header.

## Next Steps

1. **Integrate front‑end**: update fetch/axios calls to these endpoints.
2. **Validate inputs**: integrate libraries like Express Validator or Joi.
3. **Deploy**: use services like Render, Railway, or Vercel functions.

