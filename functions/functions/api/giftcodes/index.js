import { requireAuth } from "../../_lib/auth.js";
import { json, errorResponse } from "../../_lib/response.js";

// Public: anyone visiting the site can read the current codes
export async function onRequestGet({ env }) {
    const { results } = await env.DB.prepare(
        "SELECT id, code, description, date_added AS dateAdded FROM gift_codes ORDER BY date_added DESC"
    ).all();
    return json(results);
}

// Protected: dashboard adds a new code
export async function onRequestPost({ request, env }) {
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

    try {
        const result = await env.DB.prepare(
            "INSERT INTO gift_codes (code, description, date_added) VALUES (?, ?, ?)"
        ).bind(code.trim(), description || "Redeem in-game for rewards", dateAdded).run();
        return json({ id: result.meta.last_row_id, code, description, dateAdded }, 201);
    } catch (e) {
        if (String(e).includes("UNIQUE")) {
            return errorResponse("That code already exists", 409);
        }
        return errorResponse("Failed to add code", 500);
    }
}
