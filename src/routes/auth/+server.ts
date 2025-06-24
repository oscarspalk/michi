import { createSession, encodeSessionPublicJSON, validateSessionToken } from "$lib/auth/session";
import { json, text, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
    const newSession = await createSession()

    cookies.set('token', newSession.token, {path: '/'})

	return text("Here you go");
};

export const GET : RequestHandler = async ({request, cookies}) => {
    
    const token = cookies.get('token')
    if(token != null){
    let session = await validateSessionToken(token)
    if(session != null){
        return text("sucess")
    }
}
    return text("failure")
}