import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
    rest.get("/me", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                id: 1,
                name: "test1",
                email: "test1@gmail.com",
                success: 1,
                fail: 0,
                created_at: "2021-07-27T14:27:25.000000Z",
                updated_at: "2021-07-27T14:27:25.000000Z",
            })
        );
    }),

    rest.post("/login", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                token: "eyJ0eX",
            })
        );
    }),
    rest.post("/signup", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({

            })
        );
    }), rest.post("/logout", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({

            })
        );
    }),
    rest.get("/questions", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    question: {
                        "_id": "62150b9107c53fd35b403c21",
                        "text": "q1",
                        "userRef": "61f550ffb9369f8bbd9b6ca3",
                        "answerRef": "62150b9107c53fd35b403c1f",
                        "createdAt": "2022-02-22T16:13:05.954Z",
                        "updatedAt": "2022-02-22T16:13:05.954Z",
                        "__v": 0
                    },
                    options: [
                        {
                            "_id": "62150b9107c53fd35b403c1f",
                            "text": "a1",
                            "userRef": "61f550ffb9369f8bbd9b6ca3",
                            "createdAt": "2022-02-22T16:13:05.875Z",
                            "updatedAt": "2022-02-22T16:13:05.875Z",
                            "__v": 0
                        }
                    ]
                },

            )
        );
    }),
    rest.get("/question/62150b9107c53fd35b403c21/answer", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                question: {
                    "_id": "62150b9107c53fd35b403c21",
                    "text": "q1",
                    "userRef": "61f550ffb9369f8bbd9b6ca3",
                    "answerRef": "62150b9107c53fd35b403c1f",
                    "createdAt": "2022-02-22T16:13:05.954Z",
                    "updatedAt": "2022-02-22T16:13:05.954Z",
                    "__v": 0
                },
                answer: {
                    "_id": "62150b9107c53fd35b403c1f",
                    "text": "a1",
                    "userRef": "61f550ffb9369f8bbd9b6ca3",
                    "createdAt": "2022-02-22T16:13:05.875Z",
                    "updatedAt": "2022-02-22T16:13:05.875Z",
                    "__v": 0
                },
                user: {
                    "_id": "61f550ffb9369f8bbd9b6ca3",
                    "name": "gaza2018",
                    "email": "test@gmail.com",
                    "createdAt": "2022-01-29T14:36:47.337Z",
                    "updatedAt": "2022-02-25T14:33:58.581Z",
                    "__v": 0,
                    "avatar": "images\\1643467026647.0454.png",
                    "cover": "images\\1643467120174.2993.png",
                    "success": 155,
                    "fail": 40
                }
            })
        );
    }),


    rest.get("*", (req, res, ctx) => {
        console.error(`Please add request handler for ${req.url.toString()}`);
        return res(
            ctx.status(500),
            ctx.json({ error: "You must add request handler." })
        );
    })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };