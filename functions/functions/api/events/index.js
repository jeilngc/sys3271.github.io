import { requireAuth } from "../../_lib/auth.js";
import { json, errorResponse } from "../../_lib/response.js";

export async function onRequestGet({ env }) {
    const { results } = await env.DB.prepare(
        `SELECT id, title, description, date, time, category
         FROM events ORDER BY date ASC, id ASC`
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

    const { title, description, date, time, category } = body || {};
    if (!title || !date) {
        return errorResponse("title and date are required", 400);
    }

    const result = await env.DB.prepare(
        `INSERT INTO events (title, description, date, time, category)
         VALUES (?, ?, ?, ?, ?)`
    ).bind(
        title, description || "", date, time || "", category || "event"
    ).run();

    return json({ id: result.meta.last_row_id }, 201);
}
