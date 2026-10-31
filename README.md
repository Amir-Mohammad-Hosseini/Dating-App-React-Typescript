<div align="center">

# 🔥 Ember — Dating App Website

A modern, fully responsive, real-time dating web app built with **React 19 + TypeScript**.

![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routing & Guards](#routing--guards)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Acknowledgments](#acknowledgments)
- [License](#license)
- [🇮🇷 ترجمه فارسی](#-ترجمه-فارسی-فقط-برای-مطالعه-شخصی)

---

## About

**Ember** is a full-featured dating web application. Users can sign up, complete a multi-step onboarding, discover people with search filters, match with them, chat in real time, and keep track of who visited or liked their profile.

The frontend is written entirely in **TypeScript**, and **every page and component is responsive**, from small phones to large desktop screens.

## Features

**Authentication**
- Sign up, log in, and log out
- Email verification
- Forgot / reset password via email link

**Onboarding**
- Multi-step profile setup: About you → Your story → Your location → Your photos → Done
- Photo upload

**Discover & Matching**
- Swipe-style Discover page
- Search and filter options
- Like / unlike, block, and report users
- Match modal when two users like each other
- Matches page

**Real-time Chat (Socket.IO)**
- Instant text messaging
- Image sending
- Unread message counts and a navbar badge
- Last message and time in the conversation list
- Online / offline status and last seen
- Clear chat, report, and block from the conversation

**Social Activity**
- Profile visitors list
- Profile likers list
- Real-time notifications with an unread badge

**Profile & Settings**
- View other users' profiles with a photo gallery (Swiper)
- Edit your own profile
- Change password, manage blocked accounts, delete account

**Pro Page**
- Upgrade page (UI only, no real payment)

**Responsive Design**
- All pages and components adapt to mobile, tablet, and desktop

## Screenshots

> Each page is shown on desktop and mobile to demonstrate the responsive layout.

### Authentication

| Page | Desktop | Mobile |
| --- | --- | --- |
| Welcome | ![Welcome desktop](docs/screenshots/desktop/welcome.png) | ![Welcome mobile](docs/screenshots/mobile/welcome.png) |
| Login | ![Login desktop](docs/screenshots/desktop/login.png) | ![Login mobile](docs/screenshots/mobile/login.png) |
| Sign up | ![Sign up desktop](docs/screenshots/desktop/signup.png) | ![Sign up mobile](docs/screenshots/mobile/signup.png) |
| Forgot password | ![Forgot password desktop](docs/screenshots/desktop/forgot-password.png) | ![Forgot password mobile](docs/screenshots/mobile/forgot-password.png) |

### Onboarding

| Page | Desktop | Mobile |
| --- | --- | --- |
| About you | ![About you desktop](docs/screenshots/desktop/onboarding-about-you.png) | ![About you mobile](docs/screenshots/mobile/onboarding-about-you.png) |
| Your story | ![Your story desktop](docs/screenshots/desktop/onboarding-your-story.png) | ![Your story mobile](docs/screenshots/mobile/onboarding-your-story.png) |
| Your location | ![Your location desktop](docs/screenshots/desktop/onboarding-your-location.png) | ![Your location mobile](docs/screenshots/mobile/onboarding-your-location.png) |
| Your photos | ![Your photos desktop](docs/screenshots/desktop/onboarding-your-photos.png) | ![Your photos mobile](docs/screenshots/mobile/onboarding-your-photos.png) |
| You are done | ![You are done desktop](docs/screenshots/desktop/onboarding-done.png) | ![You are done mobile](docs/screenshots/mobile/onboarding-done.png) |

### Main App

| Page | Desktop | Mobile |
| --- | --- | --- |
| Discover | ![Discover desktop](docs/screenshots/desktop/discover.png) | ![Discover mobile](docs/screenshots/mobile/discover.png) |
| Match modal | ![Match modal desktop](docs/screenshots/desktop/match-modal.png) | ![Match modal mobile](docs/screenshots/mobile/match-modal.png) |
| Matches | ![Matches desktop](docs/screenshots/desktop/matches.png) | ![Matches mobile](docs/screenshots/mobile/matches.png) |
| Messages (conversation) | ![Messages desktop](docs/screenshots/desktop/messages.png) | ![Messages mobile](docs/screenshots/mobile/messages.png) |
| Profile view | ![Profile view desktop](docs/screenshots/desktop/profile-view.png) | ![Profile view mobile](docs/screenshots/mobile/profile-view.png) |
| My profile | ![My profile desktop](docs/screenshots/desktop/my-profile.png) | ![My profile mobile](docs/screenshots/mobile/my-profile.png) |
| Notifications | ![Notifications desktop](docs/screenshots/desktop/notifications.png) | ![Notifications mobile](docs/screenshots/mobile/notifications.png) |
| Activity (visitors / likes) | ![Activity desktop](docs/screenshots/desktop/activity.png) | ![Activity mobile](docs/screenshots/mobile/activity.png) |
| Settings | ![Settings desktop](docs/screenshots/desktop/settings.png) | ![Settings mobile](docs/screenshots/mobile/settings.png) |
| Pro | ![Pro desktop](docs/screenshots/desktop/pro.png) | ![Pro mobile](docs/screenshots/mobile/pro.png) |

## Tech Stack

**Frontend (TypeScript)**

| Area | Tools |
| --- | --- |
| Framework | React 19, TypeScript, Vite |
| Styling | Tailwind CSS 4, DaisyUI |
| Routing | React Router (with route guards) |
| Server state | TanStack Query, Axios |
| Client state | Zustand (persisted store) |
| Forms & validation | React Hook Form, Zod |
| Real-time | Socket.IO Client |
| UI & UX | Motion, Swiper, Sonner (toasts), SweetAlert2, React Icons |
| Storage | idb-keyval |
| Linting | oxlint |

**Backend**

| Area | Tools |
| --- | --- |
| Runtime | Node.js, Express |
| Real-time | Socket.IO |
| Database | PostgreSQL |
| Auth | express-session, bcrypt |
| Uploads & email | Multer, Nodemailer |
| Infrastructure | Docker Compose |

## Project Structure

```
frontend/
├── public/
└── src/
    ├── assets/       # Images and static assets
    ├── components/   # Reusable UI components
    ├── data/         # Static data and constants
    ├── guards/       # Route guards (AuthRoute, OnboardingRoute, ProtectedRoute)
    ├── hooks/        # Custom React hooks (including socket hooks)
    ├── layouts/      # Root, Onboarding, Messages and Activity layouts
    ├── lib/          # Library setup (e.g. socket client)
    ├── pages/        # Page components, grouped by feature
    ├── routes/       # Router configuration
    ├── services/     # API calls and endpoints
    ├── store/        # Zustand stores
    ├── types/        # TypeScript types
    ├── utils/        # Helper functions
    ├── App.tsx
    ├── index.css
    └── main.tsx
```

## Routing & Guards

Access to routes is controlled by three guards:

| Guard | Who can access |
| --- | --- |
| `AuthRoute` | Logged-out users only (Welcome, Login, Sign up, Forgot password) |
| `OnboardingRoute` | Logged-in users with an incomplete profile |
| `ProtectedRoute` | Logged-in users with a completed profile |

| Path | Page | Guard |
| --- | --- | --- |
| `/` | Welcome | AuthRoute |
| `/login`, `/signup`, `/forgot-password` | Auth pages | AuthRoute |
| `/onboarding/*` | Onboarding steps | OnboardingRoute |
| `/discover` | Discover | ProtectedRoute |
| `/matches` | Matches | ProtectedRoute |
| `/messages`, `/messages/:matchId` | Messages | ProtectedRoute |
| `/users/:userId` | Profile view | ProtectedRoute |
| `/myProfile` | My profile | ProtectedRoute |
| `/settings`, `/settings/blocked` | Settings | ProtectedRoute |
| `/notifications` | Notifications | ProtectedRoute |
| `/activity/visitors`, `/activity/likes` | Activity | ProtectedRoute |
| `/pro` | Pro (UI only) | ProtectedRoute |
| `/resetpassword/:username/:code` | Reset password | Public |
| `/confirm/:username/:code` | Verify email | Public |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Docker](https://www.docker.com/) and Docker Compose

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-repository-folder>
```

### 2. Start the backend

Create a `.env` file for the server (see [Environment Variables](#environment-variables)), then run:

```bash
docker compose up
```

This starts the API server on port `3001` together with the PostgreSQL database. A database admin UI is available at `http://localhost:8080` (choose **PostgreSQL** as the system).

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables

Create a `.env` file for the server with the following variables (do **not** commit real values):

```dotenv
# Server
PORT=3001

# Database
PGUSER=
PGDATABASE=
PGPASSWORD=
PGPORT=5432
PGHOST=db

# Email
EMAIL_ADDRESS=
EMAIL_PASSWORD=

# Optional: use Mailpit for local email testing
# SMTP_HOST=mailpit
# SMTP_PORT=1025

# Links inside emails point to the React app
FRONTEND_URL=http://localhost:5173
```

> **Tip:** If you use Gmail, `EMAIL_PASSWORD` must be an [App Password](https://support.google.com/accounts/answer/185833), not your normal account password.

## Scripts

Run these inside the `frontend` folder:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check with `tsc` and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint the code with oxlint |

## Acknowledgments

The backend is based on [pawaters/dating-app](https://github.com/pawaters/dating-app). The frontend was designed and built from scratch.

## License

This project is licensed under the [MIT License](LICENSE).

## Thanks

Special thanks to Masoumeh Rashidian.

---

<div dir="rtl">

## 🇮🇷 ترجمه فارسی (فقط برای مطالعه شخصی)

### درباره پروژه

**Ember** یک وب‌اپلیکیشن کامل دوستیابی است. کاربران می‌توانند ثبت‌نام کنند، یک onboarding چندمرحله‌ای را کامل کنند، با فیلتر و جستجو افراد را پیدا کنند، با هم match شوند، به‌صورت real-time چت کنند و ببینند چه کسانی پروفایلشان را دیده یا لایک کرده‌اند.

فرانت‌اند کاملاً با **TypeScript** نوشته شده و **تمام صفحات و کامپوننت‌ها ریسپانسیو هستند**، از موبایل‌های کوچک تا مانیتورهای بزرگ.

### قابلیت‌ها

- **احراز هویت:** ثبت‌نام، ورود، خروج، تأیید ایمیل، فراموشی و بازنشانی رمز عبور
- **Onboarding:** تنظیم پروفایل در چند مرحله (درباره تو، داستان تو، موقعیت مکانی، عکس‌ها، پایان) همراه با آپلود عکس
- **Discover و Match:** صفحه کشیدنی (swipe)، جستجو و فیلتر، لایک و آنلایک، بلاک و گزارش کاربر، مودال match و صفحه Matches
- **چت real-time:** ارسال پیام متنی و عکس، تعداد پیام‌های خوانده‌نشده و badge در نوار بالا، آخرین پیام و زمان آن، وضعیت آنلاین/آفلاین و آخرین بازدید، پاک کردن چت، گزارش و بلاک
- **فعالیت‌ها:** لیست بازدیدکننده‌ها و لایک‌کننده‌ها، اعلان‌های real-time با badge
- **پروفایل و تنظیمات:** مشاهده پروفایل دیگران با گالری عکس، ویرایش پروفایل خود، تغییر رمز، مدیریت اکانت‌های بلاک‌شده، حذف حساب
- **صفحه Pro:** فقط UI است و پرداخت واقعی ندارد
- **ریسپانسیو:** همه صفحات برای موبایل، تبلت و دسکتاپ بهینه شده‌اند

### تکنولوژی‌ها

- **فرانت‌اند:** React 19، TypeScript، Vite، Tailwind CSS 4 + DaisyUI، React Router، TanStack Query، Axios، Zustand، React Hook Form + Zod، Socket.IO Client، Motion، Swiper، Sonner، SweetAlert2
- **بک‌اند:** Node.js، Express، Socket.IO، PostgreSQL، Docker Compose

### ساختار پوشه‌ها

پوشه `src` شامل این بخش‌هاست: `assets` (تصاویر)، `components` (کامپوننت‌های قابل‌استفاده مجدد)، `data` (داده‌های ثابت)، `guards` (محافظ‌های روت)، `hooks` (هوک‌های سفارشی)، `layouts` (لایه‌های صفحات)، `lib` (تنظیمات کتابخانه‌ها مثل socket)، `pages` (صفحات)، `routes` (تنظیمات روتر)، `services` (فراخوانی API)، `store` (استیت‌های Zustand)، `types` (تایپ‌ها) و `utils` (توابع کمکی).

### گارد‌ها

- `AuthRoute`: فقط کاربران لاگین‌نکرده
- `OnboardingRoute`: کاربران لاگین‌کرده با پروفایل ناقص
- `ProtectedRoute`: کاربران لاگین‌کرده با پروفایل کامل

### نحوه اجرا

1. ریپو را clone کنید.
2. فایل `.env` سرور را بسازید (متغیرها در بخش انگلیسی بالا آمده‌اند).
3. بک‌اند را با `docker compose up` اجرا کنید (سرور روی پورت 3001 و پنل مدیریت دیتابیس روی `localhost:8080` با انتخاب PostgreSQL).
4. وارد پوشه `frontend` شوید و `npm install` و بعد `npm run dev` را بزنید.
5. برنامه روی `http://localhost:5173` در دسترس است.

### نکته امنیتی

مقدار واقعی `EMAIL_PASSWORD` و بقیه رمزها را هرگز commit نکنید. فایل `.env` باید در `.gitignore` باشد و یک `.env.example` با مقادیر خالی در ریپو بگذارید.

### لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

</div>

## تشکرها

تشکر ویژه از مصی رشیدیان