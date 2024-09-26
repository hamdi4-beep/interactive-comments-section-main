import * as React from 'react'

import Comment from './Comment'
import data from '../data.json'
import AddComment from './AddComment'

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
                        <Comment
                            data={{
                                currentUser: data.currentUser,
                                ...comment
                            }}
                        />
                        
                        {replies.length > 0 && (
                            <RepliesList replies={replies} />
                        )}
                    </div>
                )})
            }

            <AddComment user={data.currentUser} />
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