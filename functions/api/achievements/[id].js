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

    const { title, description, date, category, damage, image, highlight } = body || {};
    if (!title || !date || !category) {
        return errorResponse("title, date and category are required", 400);
    }

    await env.DB.prepare(
        `UPDATE achievements
         SET title = ?, description = ?, date = ?, category = ?, damage = ?, image = ?, highlight = ?
         WHERE id = ?`
    ).bind(
        title, description || "", date, category,
        damage || null, image || null, highlight ? 1 : 0, params.id
    ).run();

    return json({ ok: true });
}

export async function onRequestDelete({ request, env, params }) {
    const authFail = await requireAuth(request, env);
    if (authFail) return authFail;

    await env.DB.prepare("DELETE FROM achievements WHERE id = ?").bind(params.id).run();
    return json({ ok: true });
}
