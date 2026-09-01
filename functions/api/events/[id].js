import { requireAuth } from "../../_lib/auth.js";
import { json, errorResponse } from "../../_lib/response.js";

export async function onRequestPut({ request, env, params }) {
    const authFail = await requireAuth(request, env);
    if (authFail) return authFail;

    let body;
    try {
        body = await request.json();
    } catch {
        return errorResponse("Invalid JSON body", 400);
    }

    const { title, description, date, time, category, highlight } = body || {};
    if (!title || !date) {
        return errorResponse("title and date are required", 400);
    }

    await env.DB.prepare(
        `UPDATE events
         SET title = ?, description = ?, date = ?, time = ?, category = ?, highlight = ?
         WHERE id = ?`
    ).bind(
        title, description || "", date, time || "", category || "event", highlight ? 1 : 0, params.id
    ).run();

    return json({ ok: true });
}

export async function onRequestDelete({ request, env, params }) {
    const authFail = await requireAuth(request, env);
    if (authFail) return authFail;

    await env.DB.prepare("DELETE FROM events WHERE id = ?").bind(params.id).run();
    return json({ ok: true });
}
