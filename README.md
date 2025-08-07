# 🎵 Disc Diary

**Disc Diary** is a social platform for music lovers — think of it as **Goodreads for albums**. Users can share reviews, comment on albums, and create posts about the music that moves them. Whether you're into Björk, The Beatles, or Black MIDI, Disc Diary is your digital record shelf.

---

## 🚀 Features

- Browse albums and their tracklists
- Post reviews or comments on your favorite albums
- Create user profiles and posts
- Interact with other music lovers by engaging with their thoughts
- Fully RESTful API built with TypeScript and Express

---

## 📦 Tech Stack

- **Node.js** with **Express**
- **PostgreSQL** for test database
- **TypeScript**
- **Jest** for testing
- **TSX/Nodemon** for development

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/disc-diary.git
cd disc-diary
```

### 2. Install the Dependencies
```bash
npm i
```

### 3. Set up your database
```bash
npm run setup-dbs
```

### 4 Create .env files
Set up .env.test in your directory and add it to a .gitignore file
(alternatively write .env.\* in the file to ignore all .env files)

they should each contain:

`PGDATABASE=<insert db name here>`
`PGPASSWORD=<insert psql password here>`


### 5. Seed your local pg database
```bash
npm run seed
```

### 6. Start the Dev Server
```bash
npm run dev
```

To make local requests consider using Insomnia or Postman

Frontend to come...
