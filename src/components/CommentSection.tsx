import Comment from './Comment'
import data from '../data.json'

export type CommentT = typeof comments[0]
export type ReplyT = typeof reply

export type DataT = 
    | CommentT
    | ReplyT

const comments = data.comments
const reply = comments.filter(comment => comment.replies)[0].replies[0]

export default function CommentSection() {
    return (
        <div className='grid gap-4'>
            {comments.map(comment => {
                const replies = comment.replies

                return (
                    <div key={comment.id}>
                        <Comment data={comment} />
                        
                        {replies.length > 0 && (
                            <RepliesList replies={replies} />
                        )}
                    </div>
                )})
            }

            <div className="bg-white rounded-xl p-4 flex gap-4 items-start">
                <div className="user-img self-start flex-shrink-0">
                    <img
                        src={data.currentUser.image.png}
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
        </div>
    )
}

const RepliesList = ({
    replies
}: {
    replies: ReplyT[]
}) => {
    return (
        <div className='grid gap-4 p-4 pr-0 ml-14'>
            {replies.map((reply, i) => (
                <Comment
                    data={{
                        currentUser: data.currentUser,
                        ...reply
                    }}
                    key={i}
                />
            ))}
        </div>
    )
}