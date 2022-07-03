# Guestbook - Backend

This is a **Guestbook** app with **_Nodejs_** and **_Express_**.

### Run the app

In the project directory, you can run:

#### `yarn start`

> Runs the app in the development mode.

### Run tests

In the project directory, you can run:

#### `yarn test`

> Runs test suits.

---

## Available routes

You can see **API** documentation [_here_](https://documenter.getpostman.com/view/21757226/UzJEULKB).

### User routes

| DESCRIPTION | ROUTE          | METHOD |
| ----------- | -------------- | ------ |
| Signup      | `/user/signup` | `POST` |
| Signing in  | `/user/signin` | `POST` |

### Messages routes

| DESCRIPTION      | ROUTE                  | METHOD   |
| ---------------- | ---------------------- | -------- |
| Get all messages | `/messages`            | `GET`    |
| Add new messages | `/messages`            | `POST`   |
| Edit message     | `/messages/:messageId` | `PATCH`  |
| Delete message   | `/messages/:messageId` | `DELETE` |

### Replies routes

| DESCRIPTION   | ROUTE                 | METHOD |
| ------------- | --------------------- | ------ |
| Add new reply | `/replies/:messageId` | `POST` |

## Dependencies

- **mongoose** to connect to MongoDB.
- **joi** for schema validation to validate user input.
- **bcryptjs** to hash user password.
- **jsonwebtoken** to generate and verify JWT token.

## Todo

- [ ] Logger
- [ ] Global error handling
- [ ] System monitoring
