# Task Manager

## Description

A MERN stack web app to manage tasks.

## Table of Contents

- [Installation](#installation)
- [Screenshots](#screenshots)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Pnpm](https://pnpm.io/installation#using-corepack)

### Steps

- Clone the repository

```bash
git clone https://github.com/phantomknight287/internships.git
```

Since this code is on different branch, you need to checkout to that branch

```bash
git checkout mohite-tax-consulting
```

- Install dependencies

```bash
cd frontend && pnpm i && cd ../backend && pnpm i
```

- Create a `.env` file in the `backend` and `frontend` directory and use `.env.example` as reference

- Start the backend server

```bash
cd backend && pnpm prisma db push & pnpm dev
```

- Start the frontend server

```bash
cd frontend && pnpm dev
```


## Screenshots

![image.png](/assets/login.png)

![image.png](/assets/register.png)

![image.png](/assets/all-tasks.png)

![image.png](/assets/create-event.png)

![image.png](/assets/create-event-data.png)

![image.png](/assets/task-info.png)

![image.png](/assets/update-task.png)
