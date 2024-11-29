import { Link} from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import StyledBox from "../../components/common/StyledBox"
import { Typography } from "@mui/material"
import Notification from "../../components/common/Notification"
import generatePassword from "../../utils/generatePassword"

const Home = () => {
    const { user } = useAppSelector(state => state.user)

    console.log("generatePassword", generatePassword())

  return (
    <StyledBox>
      <Notification  />
      <Typography variant="h4">Home</Typography>
      {user ? (
        <Link to={"/company"} replace>
          Company
        </Link>
      ) : (
        <Link to={"/auth"} replace>
          Auth
        </Link>
      )}
    </StyledBox>
  )
}

export default Home
