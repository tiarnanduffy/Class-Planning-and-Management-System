import { getUserByID } from "@/app/lib/data"
import { Users } from "@/app/lib/definitions"


export default async function Page({ user_id }: { user_id: number }) {

    const user: Users = await getUserByID(user_id);
    // Not implemented
    // If updated in future Login function will be crucial
    return (
        <div>

        </div>
    )
}
