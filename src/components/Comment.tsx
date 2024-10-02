import * as React from 'react'

import {
    currentUser,
    UserComment,
    UserReply
} from '../App'

import FormComponent from './FormComponent'

export default function Comment({
    comment,
    updateComment
}: {
    comment: UserComment
    updateComment: Function
}) {
    const [isReplying, setIsReplying] = React.useState(false)
    const [isEditing, setIsEditing] = React.useState(false)

    const user = comment.user
    const isCurrentUser = currentUser.username === user.username

    const replies = comment.replies

    return (
        <div className='comment-wrapper'>
            <div className='comment'>
                <div className="comment-design">
                    <div className="items-list flex gap-4">
                        <ScoreComponent defaultScore={comment.score} />

                        <div className='w-full'>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="user-img">
                                        <img
                                            src={user.image.png}
                                            className="user-avatar"
                                            alt=""
                                        />
                                    </div>

                                    <h2 className='font-bold'>{user.username}</h2>

                                    {isCurrentUser && (
                                        <span className='currentUser-label'>you</span>
                                    )}

                                    <span className='comment-date'>{comment.createdAt}</span>
                                </div>

                                <div className="buttons flex gap-4">
                                    {isCurrentUser && <Btn onClick={() => setIsEditing(!isEditing)}>
                                        <img src="/interactive-comments-section-main/assets/images/icon-edit.svg" alt="" />
                                        Edit
                                    </Btn>}

                                    <Btn onClick={() => setIsReplying(!isReplying)}>
                                        <img src="/interactive-comments-section-main/assets/images/icon-reply.svg" alt="" />
                                        Reply
                                    </Btn>
                                </div>

                                
                            </div>

                            <p className='py-4'>
                                {(comment as any).replyingTo && (
                                    <span className='font-bold text-primary-moderate-blue'>@{(comment as any).replyingTo} </span>
                                )}
                                
                                {comment.content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {isReplying && (
                <FormComponent
                    type='reply'
                    onUpdate={(value: string) => {
                        setIsReplying(false)

                        updateComment({
                            type: 'reply',
                            comment,
                            value
                        })
                    }}
                />
            )}

            {isEditing && (
                <FormComponent
                    type="edit"
                    onUpdate={() => {
                        setIsEditing(false)
                        alert('The edit functionality is currently being developed.')
                    }}
                />
            )}

            {replies?.length > 0 && (
                <div className='grid gap-4 ml-16 p-4 pb-0 pr-0'>
                    {replies.map((reply, i) => (
                        <Comment
                            comment={reply as UserReply as any}
                            updateComment={updateComment}
                            key={i}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export const ScoreComponent = ({
    defaultScore
}: {
    defaultScore: number
}) => {
    const [score, setScore] = React.useState(defaultScore)

    const handleIncreaseClick = () => score < 50 && setScore(score + 1)
    const handleDecreaseClick = () => score > 0 && setScore(score - 1)

    return (
        <div className="score-component bg-[#eee] grid text-center p-2 rounded-lg self-start w-12">
            <button className="text-neutral-grayish-blue" onClick={handleIncreaseClick}>+</button>
            <span className='text-primary-moderate-blue font-bold py-3'>{score}</span>
            <button onClick={handleDecreaseClick}>-</button>
        </div>
    )
}

export const Btn = ({
    children,
    onClick
}: {
    children: React.ReactNode,
    onClick: () => void
}) => (
    <button className='btn' onClick={onClick}>
        {children}
    </button>
)