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
  replies: {
      id: number;
      content: string;
      createdAt: string;
      score: number;
      replyingTo: string;
      user: {
          image: {
          png: string;
          webp: string;
      };
          username: string;
      };
  }[];
}

export type UserReply = UserComment['replies'][0]

export type CommentOrReply = 
  | UserComment
  | UserReply

function App() {

  return (
    <div className="max-w-xl">
      <CommentSection comments={comments} />
    </div>
  )
}

export default App
