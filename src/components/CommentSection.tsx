import * as React from 'react'

import Comment from './Comment'
import AddComment from './FormComponent'

import data from '../data.json'

export type UserComment = typeof comment
export type UserReply = typeof reply

export type CommentOrReply = 
    | UserComment
    | UserReply

const [comment] = data.comments.filter(comment => comment.replies)
const [reply] = comment.replies

export const currentUser = data.currentUser

export default function CommentSection() {
    const [comments, setComments] = React.useState(data.comments)

    const addComment = (comment: UserComment) => {
        setComments([
            ...comments,
            comment
        ])
    }

    return (
        <div className='grid gap-4'>
            {comments.map(comment => {
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
                updateState: addComment,
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