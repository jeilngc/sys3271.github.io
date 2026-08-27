import { clearSessionCookie } from "../../_lib/auth.js";
import { json } from "../../_lib/response.js";

export async function onRequestPost() {
    return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
}
