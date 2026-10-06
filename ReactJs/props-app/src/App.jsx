
import Contents from './Components/Contents'
import AlllStudents from './Components/AlllStudents'

const App = () => {
  const student={
    name:'Biswa',
    age:20
  };
  return (
    <div>
      <Contents />
      <AlllStudents student={student} />
    </div>
  )
}

export default App