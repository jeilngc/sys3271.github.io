// ============================================
// Shared auth helpers
// Session = "<expiryEpochSeconds>.<hexHmac>" stored in an httpOnly cookie,
// signed with env.SESSION_SECRET. No server-side session storage needed.
// ============================================

const COOKIE_NAME = "sys_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

async function hmacHex(message, secret) {
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
    return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function createSessionCookie(env) {
    const expiry = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
    const mac = await hmacHex(String(expiry), env.SESSION_SECRET);
    const token = `${expiry}.${mac}`;
    // Secure + HttpOnly + SameSite=Strict; scoped to /api and /admin
    return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearSessionCookie() {
    return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

function getCookie(request, name) {
    const header = request.headers.get("Cookie") || "";
    const match = header.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[1]) : null;
}

export async function isAuthenticated(request, env) {
    const token = getCookie(request, COOKIE_NAME);
    if (!token) return false;
    const [expiryStr, mac] = token.split(".");
    if (!expiryStr || !mac) return false;
    const expected = await hmacHex(expiryStr, env.SESSION_SECRET);
    if (expected !== mac) return false;
    return Number(expiryStr) > Math.floor(Date.now() / 1000);
}

// Call at the top of any write (POST/PUT/DELETE) handler.
// Returns a 401 Response if not authenticated, otherwise null.
export async function requireAuth(request, env) {
    const ok = await isAuthenticated(request, env);
    if (!ok) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }
    return null;
}
