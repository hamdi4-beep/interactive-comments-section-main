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
  | 'UPDATE_COMMENT_SCORE'

export const reducer = (state: UserComment[], action: {
  type: STATE_ACTIONS,
  value?: string
  comment?: UserComment,
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

      return updateLocalStorage([...state, newComment as any as UserComment])

    case 'REPLY_COMMENT': {
      const userComment = action.comment!
      const userReply = action.comment as any as UserReply

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
      
      return updateLocalStorage(updateReplies(userComment))
    }

    case 'EDIT_COMMENT': {
      const userReply = action.comment as any as UserReply
      const associatedComment = findAssociatedComment(userReply)

      const editComment = (currentComment: UserComment) => state.map(it => {
        if (currentComment == it) {
          return {
            ...currentComment,
            content: action.value as string
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
                content: action.value as string
              }
            })
          }
        }))
      }

      return updateLocalStorage(editComment(action.comment!))
    }

    case 'DELETE_COMMENT':
      const userReply = (action.comment as any as UserReply)
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

    case 'UPDATE_COMMENT_SCORE': {
      const associatedComment = findAssociatedComment(action.comment as any as UserReply)!

      const updateScore = (comment: any) => state.map(it => {
        if (comment !== it) return it

        return {
          ...comment,
          score: action.score
        }
      })

      if (associatedComment) return updateLocalStorage(state.map(it => {
        if (it !== associatedComment) return it

        return {
          ...it,
          replies: it.replies.map(it => {
            if (it !== action.comment as any as UserReply) return it

            return {
              ...it,
              score: action.score
            }
          })
        }
      }) as UserComment[])

      return updateLocalStorage(updateScore(action.comment!))
    }

    default:
      return state
  }
}

let nextID = 4

function App() {
  if (!localStorage.getItem('comments')) {
    const commentsStringified = JSON.stringify(comments)
    localStorage.setItem('comments', commentsStringified)
  }

  return (
    <div className="max-w-2xl mt-4">
      <CommentSection comments={JSON.parse(localStorage.getItem('comments') as string)} />
    </div>
  )
}

export default App

function updateLocalStorage(comments: UserComment[]): UserComment[] {
  const stringifiedComments = JSON.stringify(comments)
  localStorage.setItem('comments', stringifiedComments)

  return JSON.parse(stringifiedComments)
}