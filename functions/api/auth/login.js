import { createSessionCookie } from "../../_lib/auth.js";
import { json, errorResponse } from "../../_lib/response.js";

export async function onRequestPost({ request, env }) {
    let body;
    try {
        body = await request.json();
    } catch {
        return errorResponse("Invalid JSON body", 400);
    }

    const { password } = body || {};
    if (!password || password !== env.ADMIN_PASSWORD) {
        return errorResponse("Incorrect password", 401);
    }

    const cookie = await createSessionCookie(env);
    return json({ ok: true }, 200, { "Set-Cookie": cookie });
}
