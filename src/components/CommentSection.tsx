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
    const [state, setState] = React.useState(comments)
    console.log(state)

    return (
        <div className='grid gap-4'>
            {state.map((comment, i) => {
                const replies = comment.replies

                return (
                    <div key={i}>
                        <Comment
                            data={comment}
                            updateComment={(reply: UserReply) => {
                                const replies = comment.replies
                                replies.push(reply)

                                console.log('Added a reply!')
                            }}
                        />

                        {replies.length > 0 && (
                            <div className='grid gap-4 p-4 pr-0 ml-14'>
                                {replies.map((reply, i) => (
                                    <Comment
                                        data={reply}
                                        updateComment={() => alert('The functionality to reply to other replies is currently being developed.')}
                                        key={i}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )})
            }

            <FormComponent data={{
                type: 'Comment',
                createComment(formValue: string) {
                    const comment = {
                        id: nextID++,
                        content: formValue,
                        createdAt: "now",
                        score: 0,
                        user: currentUser,
                        replies: []
                    }

                    console.log('Could this be running instead?')

                    setState([
                        ...state,
                        comment
                    ])
                }
            }} />
        </div>
    )
}