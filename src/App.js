import './App.css'
import Search from './components/search/Search'
import PostsTable from './components/tables/PostsTable.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className='container'>
        <header>
          <Search />
        </header>

        <main>
            <PostsTable />
        </main>
      </div>
    </Router>
  )
}

export default App
