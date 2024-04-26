import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { client_promise } from "$lib/db/mongo";
import { NODE_ENV, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private";

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
    const authOptions = {
        providers: [
            Google({
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
            })
        ],
        adapter: MongoDBAdapter(client_promise, {databaseName: NODE_ENV}),
        secret: AUTH_SECRET,
        trustHost: true
    };

    return authOptions;
});