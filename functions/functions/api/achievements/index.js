import { requireAuth } from "../../_lib/auth.js";
import { json, errorResponse } from "../../_lib/response.js";

export async function onRequestGet({ env }) {
    const { results } = await env.DB.prepare(
        `SELECT id, title, description, date, category, damage, image, highlight
         FROM achievements ORDER BY date DESC, id DESC`
    ).all();
    // SQLite stores booleans as 0/1 — coerce to real booleans for the frontend
    const coerced = results.map(r => ({ ...r, highlight: !!r.highlight }));
    return json(coerced);
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

    const { title, description, date, category, damage, image, highlight } = body || {};
    if (!title || !date || !category) {
        return errorResponse("title, date and category are required", 400);
    }

    const result = await env.DB.prepare(
        `INSERT INTO achievements (title, description, date, category, damage, image, highlight)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
        title, description || "", date, category,
        damage || null, image || null, highlight ? 1 : 0
    ).run();

    return json({ id: result.meta.last_row_id }, 201);
}
