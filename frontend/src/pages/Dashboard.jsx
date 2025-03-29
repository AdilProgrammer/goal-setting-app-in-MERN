import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'


function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector(state => state.auth)
  const {goals, isLoading, isSuccess, isError, message} = useSelector(state => state.goals)

  useEffect(() => {

    if(isError) {
      console.log(message);
      console.log('Yaha isError walay if mein bug hai')
    }
    
    
    

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  },[  isError, message, dispatch, user])

  // Check if user is not authenticated or if there's an error
  if (!user || isError) {
    return navigate('./login');
  }

  if(isLoading) {
    return <Spinner />
  }<p></p>

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>

    </>
  )
}

export default Dashboard
