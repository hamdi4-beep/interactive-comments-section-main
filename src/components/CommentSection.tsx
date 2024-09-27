import * as React from 'react'

import Comment from './Comment'
import AddComment from './AddComment'

import data from '../data.json'

export type UserComment = typeof comment
export type UserReply = typeof reply

export type CommentOrReply = 
    | UserComment
    | UserReply

const comments = data.comments

const [comment] = comments.filter(comment => comment.replies)
const [reply] = comment.replies

export const currentUser = data.currentUser

export default function CommentSection() {
    const [state, setState] = React.useState(comments)

    return (
        <div className='grid gap-4'>
            {state.map(comment => {
                const replies = comment.replies

                return (
                    <div key={comment.id}>
                        <Comment
                            data={comment}
                        />
                        
                        {replies.length > 0 && (
                            <RepliesList replies={replies} />
                        )}
                    </div>
                )})
            }

            <AddComment data={{
                updateState: setState,
                placeholder: 'Add comment...'
            }} />
        </div>
    )
}

const RepliesList = ({
    replies
}: {
    replies: UserReply[]
}) => {
    return (
        <div className='grid gap-4 p-4 pr-0 ml-14'>
            {replies.map((reply, i) => (
                <Comment
                    data={reply}
                    key={i}
                />
            ))}
        </div>
    )
}