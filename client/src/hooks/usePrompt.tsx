import { useBlocker } from "react-router-dom"

const usePrompt = () => {
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    console.log("currentLocation", currentLocation)
    console.log("nextLocation", nextLocation)
    if (currentLocation.pathname !== nextLocation.pathname) {
      if (
        window.confirm(
          "Are you sure you want to leave this page? Unsaved changes will be lost.",
        )
      ) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  })
  return blocker
}

export default usePrompt
