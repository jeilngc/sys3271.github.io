import { requireAuth } from "../../_lib/auth.js";
import { json, errorResponse } from "../../_lib/response.js";

export async function onRequestGet({ env }) {
    const { results } = await env.DB.prepare(
        "SELECT id, message, date FROM announcements ORDER BY date DESC, id DESC"
    ).all();
    return json(results);
}

export async function onRequestPost({ request, env }) {
    const authFail = await requireAuth(request, env);
    if (authFail) return authFail;

    let body;
    try {
        body = await request.json();
    } catch {
        return errorResponse("Invalid JSON body", 400);
    }

    const { message, date } = body || {};
    if (!message || !date) {
        return errorResponse("message and date are required", 400);
    }

    const result = await env.DB.prepare(
        "INSERT INTO announcements (message, date) VALUES (?, ?)"
    ).bind(message, date).run();

    return json({ id: result.meta.last_row_id, message, date }, 201);
}
