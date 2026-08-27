import { isAuthenticated } from "../../_lib/auth.js";
import { json } from "../../_lib/response.js";

export async function onRequestGet({ request, env }) {
    const ok = await isAuthenticated(request, env);
    return json({ authenticated: ok });
}
