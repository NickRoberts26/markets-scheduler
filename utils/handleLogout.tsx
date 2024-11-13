import { auth } from "@/lib/firebase";

export async function handleLogout() {
    try {
        await auth.signOut();
    } catch (error) {
        console.log(error);
    }
}