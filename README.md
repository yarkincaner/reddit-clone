<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
	<img src="/public/favicon.ico" width="80"/>
	<h3 align="center">Breadit</h3>
	<p align="center">A fullstack reddit clone built with Next.js</p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#authentication">Authentication</a></li>
    <li><a href="#error-handling">Error Handling</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Homepage][homepage-screenshot]

Breadit is a Fullstack reddit clone, which has most of its functionalities; such as creating subreddits, sharing posts, leaving comments below etc.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built with

- [![Next][Next.js]][Next-url]
- [![Tailwind][Tailwindcss]][Tailwindcss-url]
- [![Mongodb][Mongodb]][Mongodb-url]
- [![Prisma][Prisma]][Prisma-url]
- [![Redis][Redis]][Redis-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

A Breadit user can:

- Create communities
- Create posts
- Leave comments for posts
- Vote for posts and comments
- Search for communities
- Change their username

## Authentication

A user can Sign in with their google account. In order to increase user experience, sign in component shows up as a modal until user refreshes the screen.

![Sign-in][sign-in-screenshot]

Since Next.js provides server-side and client-side rendering, it is performant to use different logics both of them to authenticate the user.

Server-side component:

```typescript
import { getAuthSession } from "@/lib/auth"
const session = await getAuthSession()
```

If `getAuthSession` returns an object, then it means the user is authenticated.

Client-side component:

```typescript
import { useSession } from "next-auth/react"
const { data: session } = useSession()
```

`useSession` is a hook provided by next-auth to get current session. Next-auth also works very well with prisma and creates Account, Session and User modals which you can extend with more fields.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Error handling

#### Action without login

Some actions require to be authenticated such as voting, commenting, creating subreddits and posting. In these situations, a custom toast notification with login button shown to user. This enhances user experience (UX).

Error example:
![Voting without login][error-voting-without-login]

Code example:

```typescript
const { loginToast } = useCustomToast()

if (err instanceof AxiosError) {
	if (err.response?.status === 401) {
		return loginToast()
	}
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

- [Josh tried coding](https://youtu.be/mSUKMfmLAt0?si=ERV_RDIPVjMERDne)
- [Authentication with Auth.js](https://authjs.dev/)

<!-- MARKDOWN LINKS & IMAGES -->

[homepage-screenshot]: screenshots/homepage.png
[error-voting-without-login]: screenshots/votingWithoutLogin.gif
[sign-in-screenshot]: screenshots/sign-in-modal.png
[Next.js]: https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwindcss-url]: https://tailwindcss.com/
[Mongodb]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Mongodb-url]: https://www.mongodb.com/
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Redis]: https://img.shields.io/badge/redis-CC0000.svg?&style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/
