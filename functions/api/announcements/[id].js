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

    const { message, date } = body || {};
    if (!message || !date) {
        return errorResponse("message and date are required", 400);
    }

    await env.DB.prepare(
        "UPDATE announcements SET message = ?, date = ? WHERE id = ?"
    ).bind(message, date, params.id).run();

    return json({ ok: true });
}

export async function onRequestDelete({ request, env, params }) {
    const authFail = await requireAuth(request, env);
    if (authFail) return authFail;

    await env.DB.prepare("DELETE FROM announcements WHERE id = ?").bind(params.id).run();
    return json({ ok: true });
}
