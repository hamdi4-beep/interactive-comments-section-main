import CommentSection from "./components/CommentSection"
import data from './data.json'

export const currentUser = data.currentUser
const comments = data.comments

export type UserComment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
      image: {
          png: string;
          webp: string;
      };
      username: string;
  };
  replies: UserReply[];
}

export type UserReply = Omit<UserComment, "replies"> & {
  replyingTo: string
}

export type FormLabels =
  | 'reply'
  | 'comment'
  | 'edit'

export type STATE_ACTIONS =
  | 'CREATE_COMMENT'
  | 'REPLY_COMMENT'
  | 'EDIT_COMMENT'
  | 'DELETE_COMMENT'
  | 'UPDATE_SCORE'

export const reducer = (state: UserComment[], action: {
  type: STATE_ACTIONS,
  value?: string
  comment?: UserComment | UserReply,
  score?: number
}) => {
  const comment = {
    id: nextID++,
    content: action.value as string,
    createdAt: 'now',
    score: 0,
    user: currentUser
  }

  const findAssociatedComment = (reply: UserReply) => state.find(comment => {
    const replies = comment.replies
    return replies.find(it => it === reply)
  })

  switch (action.type) {
    case 'CREATE_COMMENT':
      const newComment = {
        ...comment,
        replies: []
      }

      // Only scrolls down to the bottom after the DOM was updated.
      // The use of 'setTimeout' will create a delay to ensure it never scrolls before the update.
      setTimeout(() => scroll({
        top: document.body.clientHeight,
        behavior: 'smooth'
      }), 0)

      return updateLocalStorage([...state, newComment])

    case 'REPLY_COMMENT': {
      const userComment = action.comment!
      const userReply = action.comment as UserReply

      const associatedComment = findAssociatedComment(userReply)

      const user = userComment.user

      const reply = {
        ...comment,
        replyingTo: user!.username
      }

      const updateReplies = (comment: UserComment) => state.map(it => {
        const replies = comment.replies

        if (it === comment) {
          return {
            ...comment,
            replies: [
              ...replies,
              reply
            ]
          }
        }

        return it
      })

      if (associatedComment) return updateLocalStorage(updateReplies(associatedComment))
      
      return updateLocalStorage(updateReplies(userComment as UserComment))
    }

    case 'EDIT_COMMENT': {
      const userReply = action.comment as any as UserReply
      const associatedComment = findAssociatedComment(userReply)

      const editComment = (currentComment: UserComment) => state.map(it => {
        if (currentComment == it) {
          return {
            ...currentComment,
            content: action.value!
          }
        }

        return it
      })

      if (associatedComment) {
        const userReply = action.comment as any as UserReply
        const associatedComment = findAssociatedComment(userReply)

        return updateLocalStorage(state.map(it => {
          const replies = it.replies

          if (it !== associatedComment) return it

          return {
            ...it,
            replies: replies.map(reply => {
              if (userReply !== reply) return reply

              return {
                ...userReply,
                content: action.value!
              }
            })
          }
        }))
      }

      return updateLocalStorage(editComment(action.comment as UserComment))
    }

    case 'DELETE_COMMENT':
      const userReply = (action.comment as UserReply)
      const associatedComment = findAssociatedComment(userReply)
      
      if (associatedComment) {
        const replies = associatedComment.replies

        return updateLocalStorage(state.map(it => {
          if (associatedComment !== it) return it

          return {
            ...associatedComment,
            replies: replies?.filter(it => it !== userReply)
          }
        }))
      }

      return updateLocalStorage(state.filter(comment => comment !== action.comment))

    case 'UPDATE_SCORE': {
      const associatedComment = findAssociatedComment(action.comment as UserReply)

      const updateScore = (userComment: UserComment | UserReply) => state.map(it => {
        if (userComment !== it) return it

        return {
          ...userComment,
          score: action.score!
        }
      })

      if (associatedComment) return updateLocalStorage(state.map(it => {
        if (it !== associatedComment) return it

        return {
          ...it,
          replies: it.replies.map(it => {
            if (it !== action.comment as UserReply) return it

            return {
              ...it,
              score: action.score
            }
          })
        }
      }) as UserComment[])

      return updateLocalStorage(updateScore(action.comment as UserComment))
    }

    default:
      return state
  }
}

let nextID = 4

function App() {
  if (!localStorage.getItem('comments')) localStorage.setItem('comments', JSON.stringify(comments))
  
  return (
    <div className="max-w-2xl mt-4">
      <CommentSection comments={JSON.parse(localStorage.getItem('comments')!)} />
    </div>
  )
}

export default App

function updateLocalStorage(comments: UserComment[]): UserComment[] {
  const stringifiedComments = JSON.stringify(comments)
  localStorage.setItem('comments', stringifiedComments)
  return comments
}