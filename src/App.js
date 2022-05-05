import './App.css'
import Search from './components/search/Search'
import PostsTable from './components/tables/PostsTable.jsx'

function App() {
  return (
    <div className='container'>
      <header>
        <Search />
      </header>

      <main>
        <PostsTable />
      </main>
    </div>
  )
}

export default App
