import sql from "$lib/db/postgres";
import { constantTimeEqual, hashSecret } from "./helpers";
import { generateSecureRandomString } from "./secrets";
import type { Session, SessionWithToken } from "./types";



const sessionExpiresInSeconds = 60 * 60 * 24; // 1 day


async function createSession(): Promise<SessionWithToken> {
	const now = new Date();

	const id = generateSecureRandomString();
	const secret = generateSecureRandomString();
	const secretHash = await hashSecret(secret);

	const token = id + "." + secret;

	const session: SessionWithToken = {
		id,
		secretHash,
		createdAt: now,
		token
	};

    await sql`
        INSERT INTO session (id, secret_hash, created_at) VALUES (${session.id}, ${session.secretHash}, ${Math.floor(session.createdAt.getTime() / 1000)})
    `

	return session;
}

async function validateSessionToken( token: string): Promise<Session | null> {
	const tokenParts = token.split(".");
	if (tokenParts.length != 2) {
		return null;
	}
	const sessionId = tokenParts[0];
	const sessionSecret = tokenParts[1];

	const session = await getSession(sessionId);
    if(session != null){
        console.log("found a matching session")
	const tokenSecretHash = await hashSecret(sessionSecret);
	const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
	if (!validSecret) {
		return null;
	}
}

	return session;
}

async function getSession( sessionId: string): Promise<Session | null> {
	const now = new Date();

    const result = await sql`
    SELECT id, secret_hash, created_at FROM session WHERE id = ${sessionId}
    `

    console.log(result)
	if (result.length !== 1) {
		return null;
	}
	const row = result[0];
	const session: Session = {
		id: row.id,
		secretHash: row.secret_hash,
		createdAt: new Date(row.created_at * 1000)
	};

	// Check expiration
	if (now.getTime() - session.createdAt.getTime() >= sessionExpiresInSeconds * 1000) {
        console.log("deleting session")
		await deleteSession(sessionId);
		return null;
	}

	return session;
}

async function deleteSession( sessionId: string): Promise<void> {
    await sql`DELETE FROM session WHERE id = ${sessionId}`
}

function encodeSessionPublicJSON(session: Session): string {
	// Omit Session.secretHash
	const json = JSON.stringify({
		id: session.id,
		created_at: Math.floor(session.createdAt.getTime() / 1000)
	});
	return json;
}

export {createSession, encodeSessionPublicJSON, validateSessionToken} 