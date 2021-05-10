import { rest } from "msw"

interface ICredentials {
  username: string
  password: string
}

interface IUser {
  username: string
  password: string
  name: string
  email: string
}

const users: IUser[] = [
  {
    username: "din-djarin",
    password: "Grogu123",
    name: "Din Djarin",
    email: "din.djarin@email.com",
  },
  {
    username: "moff-gideon",
    password: "DarkSaber",
    name: "Moff Gideon",
    email: "moff.gideon@email.com",
  },
]

export const handlers = [
  rest.post("/api/login", (req, res, ctx) => {
    const { username, password } = req.body as ICredentials

    const isUser = users.find((user) => user.username === username) || false
    if (!isUser) {
      return res(
        ctx.status(403),
        ctx.delay(500),
        ctx.json({ message: "We cannot find an account with that username" })
      )
    }

    const isAuthenticated = isUser.password === password
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.delay(500),
        ctx.json({ message: "The username or password is incorrect" })
      )
    }

    const user = {
      name: isUser.name,
      email: isUser.email,
    }
    return res(ctx.status(200), ctx.delay(500), ctx.json(user))
  }),
  rest.post("/api/logout", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(250), ctx.json({ success: true }))
  }),
]
