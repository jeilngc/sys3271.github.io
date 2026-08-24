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

    const { name, role, icon, color, span, sortOrder } = body || {};
    if (!name || !role) {
        return errorResponse("name and role are required", 400);
    }

    await env.DB.prepare(
        `UPDATE officers SET name = ?, role = ?, icon = ?, color = ?, span = ?, sort_order = ? WHERE id = ?`
    ).bind(
        name, role, icon || "user", color || "text-slate-400",
        span ? 1 : 0, sortOrder ?? 0, params.id
    ).run();

    return json({ ok: true });
}

export async function onRequestDelete({ request, env, params }) {
    const authFail = await requireAuth(request, env);
    if (authFail) return authFail;

    await env.DB.prepare("DELETE FROM officers WHERE id = ?").bind(params.id).run();
    return json({ ok: true });
}
