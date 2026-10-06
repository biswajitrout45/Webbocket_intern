
import AllStudents from './Components/AllStudents'
import {createContext} from 'react'

export const AppContext = createContext()

const App = () => {
  return (
    <div>
      <AppContext.Provider value={{name: 'React'}}>
        <AllStudents />
      </AppContext.Provider>
    </div>
  )
}

export default App