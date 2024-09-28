import CommentSection from "./components/CommentSection"
import data from './data.json'

export const currentUser = data.currentUser
const comments = data.comments

function App() {

  return (
    <div className="max-w-xl">
      <CommentSection comments={comments} />
    </div>
  )
}

export default App
