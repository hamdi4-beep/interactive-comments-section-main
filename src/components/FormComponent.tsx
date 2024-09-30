import * as React from 'react'

import {
    currentUser
} from '../App'

export default function FormComponent({
    data
}: {
    data: {
        updateComments: Function
        type: 'Comment' | 'Reply'
    }
}) {
    const labels = {
        Comment: ['Add comment...', 'Comment'],
        Reply: ['Add reply...', 'Send']
    }

    const getLabels = (label: 'Comment' | 'Reply') => labels[label]
    const [text, label] = getLabels(data.type)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const form = e.currentTarget as HTMLFormElement
        const [[, value]] = new FormData(form)

        const input = form['comment']
        input.value = ''

        if (!value) {
            alert('Please add a comment!')
            return
        }

        data.updateComments(value)
    }

    return (
        <div className="form-component bg-white rounded-xl p-4 flex gap-4 items-start">
            <div className="user-img self-start flex-shrink-0">
                <img
                    src={currentUser.image.png}
                    className="w-10 h-10"
                    alt=""
                />
            </div>

            <form action="" className="w-full" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='p-4 pt-2 pb-20 w-full border border-[hsl(223, 19%, 93%)] outline-none rounded-md'
                    name="comment"
                    placeholder={text}
                />
                
                <button
                    className='bg-primary-moderate-blue p-2 px-4 mt-4 rounded-md text-white uppercase'
                >{label}</button>
            </form>
        </div>
    )
}