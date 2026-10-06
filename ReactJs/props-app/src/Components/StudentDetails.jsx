
import PersonalDetails from './PersonalDetails'

const StudentDetails = ({student}) => {
  return (
    <div>
        <PersonalDetails data={student} />
    </div>
  )
}

export default StudentDetails