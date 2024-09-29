import * as React from 'react'

import FormComponent from './FormComponent'
import Comment from './Comment'

import {
    currentUser,
    UserComment,
    UserReply
} from '../App';

let nextID = 3

export default function CommentSection({
    comments
}: {
    comments: UserComment[]
}) {
    const [userComments, setUserComments] = React.useState(comments)

    return (
        <div className='grid gap-4'>
            {userComments.map((comment, i) => {
                const replies = comment.replies

                return (
                    <Comment
                        data={comment}
                        updateComment={(reply: UserReply) => {
                            replies.push({
                                ...reply,
                                id: nextID++
                            })

                            setUserComments(Array.from(new Set([
                                ...userComments,
                                comment
                            ])))
                        }}
                        key={i}
                    />
                )})
            }

            <FormComponent data={{
                type: 'Comment',
                updateComments(commentValue: string) {
                    const comment = {
                        id: nextID++,
                        content: commentValue,
                        createdAt: "now",
                        score: 0,
                        user: currentUser,
                        replies: []
                    }

                    setUserComments([
                        ...userComments,
                        comment
                    ])
                }
            }} />
        </div>
    )
}