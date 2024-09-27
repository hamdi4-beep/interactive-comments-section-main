import { currentUser } from "./CommentSection"

let nextID = 3

export default function FormComponent({
    data
}: {
    data: {
        updateComments?: Function
        type: string
    }
}) {
    const placeholder = {
        Comment: ['Add comment...', 'Comment'],
        Reply: ['Add reply...', 'Reply']
    } as {
        [key: string]: string[]
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const form = e.currentTarget as HTMLFormElement
        const [[, comment]] = new FormData(form)

        const input = form['comment']

        if (!data.updateComments) {
            alert('The reply functionality is under construction.')
            return
        }

        if (comment) {
            data.updateComments({
                id: nextID++,
                content: comment as string,
                createdAt: "now",
                score: 0,
                user: currentUser,
                replies: []
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
                    placeholder={placeholder[data.type][0]}
                />
                
                <button
                    className='bg-primary-moderate-blue p-2 px-4 mt-4 rounded-md text-white uppercase'
                >{placeholder[data.type][1]}</button>
            </form>
        </div>
    )
}