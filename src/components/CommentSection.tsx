import Comment from './Comment'
import data from '../data.json'

export default function CommentSection() {
    const comments = data.comments

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
        </div>
    )
}

const RepliesList = ({
    replies
}: {
    replies: any
}) => {
    return (
        <div className='grid gap-4 p-4 pr-0 ml-10'>
            {replies.map((reply: any, i: number) => (
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