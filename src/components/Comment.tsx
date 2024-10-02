import * as React from 'react'

import {
    currentUser,
    UserComment
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

    return (
        <div className='comment-wrapper'>
            <div className='comment'>
                <div className="bg-white rounded-xl p-4">
                    <div className="items-list flex gap-4">
                        <ScoreComponent defaultScore={comment.score} />

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

                                    <span className='text-neutral-grayish-blue'>{comment.createdAt}</span>
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

                            <p className='py-4'>{comment.content}</p>
                        </div>
                    </div>
                </div>
            </div>

            {isReplying && (
                <FormComponent
                    type='reply'
                    onUpdate={(value: string) => {
                        updateComment({
                            type: 'reply',
                            comment,
                            value
                        })
                    }}
                />
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
    <button className='flex items-center gap-3 text-primary-moderate-blue font-bold' onClick={onClick}>
        {children}
    </button>
)