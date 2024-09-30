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
        <div className='comments-section p-4 grid gap-4'>
            <FormComponent data={{
                type: 'Comment',
                updateComments(commentValue: string) {
                    const comment = {
                        id: nextID++,
                        content: commentValue,
                        createdAt: "now",
                        score: 0,
                        user: currentUser,
                        replies: [] as UserReply[]
                    }

                    setUserComments([
                        ...comments,
                        comment
                    ])
                }
            }} />

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
                    >
                        {replies?.length > 0 && (
                            <div className='grid gap-4 p-4 pr-0 pb-0 ml-14'>
                                {replies.map((reply, i) => (
                                    <Comment
                                        data={reply}
                                        updateComment={() => alert('The reply to replies functionality is currently being developed.')}
                                        key={i}
                                    />
                                ))}
                            </div>
                        )}
                    </Comment>
                )})
            }
        </div>
    )
}