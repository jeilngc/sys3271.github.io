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

    const { code, description, dateAdded } = body || {};
    if (!code || !dateAdded) {
        return errorResponse("code and dateAdded are required", 400);
    }

    await env.DB.prepare(
        "UPDATE gift_codes SET code = ?, description = ?, date_added = ? WHERE id = ?"
    ).bind(code.trim(), description || "Redeem in-game for rewards", dateAdded, params.id).run();

    return json({ ok: true });
}

export async function onRequestDelete({ request, env, params }) {
    const authFail = await requireAuth(request, env);
    if (authFail) return authFail;

    await env.DB.prepare("DELETE FROM gift_codes WHERE id = ?").bind(params.id).run();
    return json({ ok: true });
}
