import * as React from 'react'

import Comment from './Comment'
import AddComment from './AddComment'

import data from '../data.json'

export type CommentT = typeof comment
export type ReplyT = typeof reply
export type StateT = typeof comments

export type DataT = 
    | CommentT
    | ReplyT

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

            <AddComment updateState={setState} />
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