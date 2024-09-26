import { CommentT } from "./CommentSection"

export default function AddComment({
    user
}: {
    user: CommentT['user']
}) {
    return (
        <div className="bg-white rounded-xl p-4 mt-4 flex gap-4 items-start">
            <div className="user-img self-start flex-shrink-0">
                <img
                    src={user.image.png}
                    className="w-10 h-10"
                    alt=""
                />
            </div>

            <input
                type="text"
                className='w-full p-4 pt-2 pb-20 border border-[hsl(223, 19%, 93%)] outline-none rounded-md'
                placeholder='Add a comment...'
            />

            <button
                className='bg-primary-moderate-blue p-2 px-4 rounded-md text-white uppercase'
            >Send</button>
        </div>
    )
}