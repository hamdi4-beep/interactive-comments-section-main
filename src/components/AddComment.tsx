import { UserComment, currentUser } from "./CommentSection"

export default function AddComment({
    data
}: {
    data: {
        updateState?: React.Dispatch<React.SetStateAction<UserComment[]>>
        placeholder: string
    }
}) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const form = e.currentTarget as HTMLFormElement
        const [[, comment]] = new FormData(form)

        const input = form['comment']

        if (!data.updateState) {
            alert(`The reply feature is under construction. Try adding a comment below instead!`)
            return
        }

        if (comment) {
            let nextID = 4

            data.updateState(prev => {
                return [
                    ...prev,
                    {
                        id: nextID++,
                        content: comment as string,
                        createdAt: "now",
                        score: 0,
                        user: currentUser,
                        replies: []
                    }
                ]
            })

            input.value = ''
            return
        }

        alert('Please add a comment!')
    }

    return (
        <div className="bg-white rounded-xl p-4 mt-4 flex gap-4 items-start">
            <div className="user-img self-start flex-shrink-0">
                <img
                    src={currentUser.image.png}
                    className="w-10 h-10"
                    alt=""
                />
            </div>

            <form action="" className="w-full" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='p-4 pt-2 pb-20 w-full border border-[hsl(223, 19%, 93%)] outline-none rounded-md'
                    name="comment"
                    placeholder={data.placeholder}
                />
                
                <button
                    className='bg-primary-moderate-blue p-2 px-4 mt-4 rounded-md text-white uppercase'
                >Send</button>
            </form>
        </div>
    )
}