import { requireAuth } from "../../_lib/auth.js";
import { json, errorResponse } from "../../_lib/response.js";

export async function onRequestGet({ env }) {
    const { results } = await env.DB.prepare(
        "SELECT id, name, role, icon, color, span, sort_order AS sortOrder FROM officers ORDER BY sort_order ASC"
    ).all();
    const coerced = results.map(r => ({ ...r, span: !!r.span }));
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

    const { name, role, icon, color, span, sortOrder } = body || {};
    if (!name || !role) {
        return errorResponse("name and role are required", 400);
    }

    const result = await env.DB.prepare(
        `INSERT INTO officers (name, role, icon, color, span, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
        name, role, icon || "user", color || "text-slate-400",
        span ? 1 : 0, sortOrder ?? 0
    ).run();

    return json({ id: result.meta.last_row_id }, 201);
}
