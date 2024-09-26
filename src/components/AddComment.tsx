import { CommentT } from "./CommentSection"

export default function AddComment({
    user,
    updateState
}: {
    user: CommentT['user'],
    updateState?: React.Dispatch<React.SetStateAction<any>>
}) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const form = e.currentTarget as HTMLFormElement
        const [[, comment]] = new FormData(form)

        if (!updateState) {
            alert(`The reply feature is under construction. Try adding a comment below instead!`)
            return
        }

        if (comment) updateState((prev: any) => {
            return [
                ...prev,
                {
                    "id": 1,
                    "content": comment,
                    "createdAt": "1 month ago",
                    "score": 12,
                    user,
                    "replies": []
                }
            ]
        })
    }

    return (
        <div className="bg-white rounded-xl p-4 mt-4 flex gap-4 items-start">
            <div className="user-img self-start flex-shrink-0">
                <img
                    src={user.image.png}
                    className="w-10 h-10"
                    alt=""
                />
            </div>

            <form action="" className="w-full" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='p-4 pt-2 pb-20 w-full border border-[hsl(223, 19%, 93%)] outline-none rounded-md'
                    name="comment"
                    placeholder='Add a comment...'
                />
                <button
                    className='bg-primary-moderate-blue p-2 px-4 mt-4 rounded-md text-white uppercase'
                >Send</button>
            </form>
        </div>
    )
}