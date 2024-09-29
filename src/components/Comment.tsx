import * as React from 'react'
import FormComponent from './FormComponent'

import {
    currentUser,
    CommentOrReply,
    UserReply,
    UserComment
} from '../App'

export default function Comment({
    data,
    updateComment
}: {
    data: CommentOrReply
    updateComment: Function
}) {
    const [isReplying, setIsReplying] = React.useState(false)

    const { user } = data

    const replies = (data as UserComment)?.replies
    const reply = data as UserReply

    const isCurrentUser = user.username === currentUser?.username

    return (
        <div className='comment-wrapper'>
            <div className='comment'>
                <div className="bg-white rounded-xl p-4">
                    <div className="flex gap-4">
                        <ScoreComponent defaultScore={data.score} />

                        <div className='w-full'>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="user-img">
                                        <img
                                            src={user.image.png}
                                            className="w-10 h-10"
                                            alt=""
                                        />
                                    </div>

                                    <h2 className='font-bold'>{user.username}</h2>

                                    {isCurrentUser && (
                                        <span className='bg-primary-moderate-blue px-3 leading-tight text-white'>you</span>
                                    )}

                                    <span className='text-neutral-grayish-blue'>{data.createdAt}</span>
                                </div>

                                <button className="flex items-center gap-3 text-primary-moderate-blue font-bold" onClick={() => setIsReplying(!isReplying)}>
                                    <img src="/interactive-comments-section-main/assets/images/icon-reply.svg" alt="" />
                                    Reply
                                </button>
                            </div>

                            <p className="pt-4">
                                {reply.replyingTo && (
                                    <span className='font-bold text-primary-moderate-blue'>@{reply.replyingTo} </span>
                                )}

                                {data.content}
                            </p>
                        </div>
                    </div>
                </div>

                {isReplying && (
                    <FormComponent data={{
                        type: 'Reply',
                        updateComments: (replyValue: string) => {
                            const reply = {
                                content: replyValue,
                                createdAt: "now",
                                score: 0,
                                user: currentUser,
                                replyingTo: user.username
                            }

                            updateComment(reply)
                        }
                    }} />
                )}
            </div>

            {replies?.length > 0 && (
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
    )
}

const ScoreComponent = ({
    defaultScore
}: {
    defaultScore: number
}) => {
    const [score, setScore] = React.useState(defaultScore)

    const handleIncreaseClick = () => score < 50 && setScore(score + 1)
    const handleDecreaseClick = () => score > 0 && setScore(score - 1)

    return (
        <div className="bg-[#eee] grid text-center p-2 rounded-lg self-start w-12">
            <button className="text-neutral-grayish-blue" onClick={handleIncreaseClick}>+</button>
            <span className='text-primary-moderate-blue font-bold py-3'>{score}</span>
            <button onClick={handleDecreaseClick}>-</button>
        </div>
    )
}