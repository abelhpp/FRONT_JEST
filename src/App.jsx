import './App.css'
import Users from './Users'
import {UserProvider} from './provider/UserProvider'
function App() {
  return (
    <UserProvider>
      <Users/>
    </UserProvider>
  )
}

export default App
