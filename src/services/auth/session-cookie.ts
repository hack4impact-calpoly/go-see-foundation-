const jose = require('jose')
import { cookies } from 'next/headers'

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.JWT_SECRET),
  }
  

export async function getSession(token: any){
    try {
        const { payload, protectedHeader } = await jose.jwtVerify(token, jwtConfig.secret); // decrypt the token
        return payload.payload.user.userType;

    } catch (error) {

        // ideally this should sign them out / update that componenet and let them know to resign in 
        cookies().delete('Auth_Session')
        // If verification fails (e.g., invalid signature or expired token), an error will be thrown
        console.log('Error verifying token:', error);
        return null; // Return null or handle the error appropriately
    }
}
