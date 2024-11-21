import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material"
import { NavLink, useParams } from "react-router-dom"
import type { Page } from "../types/page"
import { TiMessages } from "react-icons/ti"
import { MdDashboard } from "react-icons/md"
import { BsDiagram3Fill } from "react-icons/bs"
import { BiTask } from "react-icons/bi"
import { FaRegCalendarAlt } from "react-icons/fa"
import { LuFile } from "react-icons/lu"

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  "&.active .list-item": {
    color: theme.palette.success.main,
  },
  "&.active .list-item__icon": {
    color: theme.palette.success.main,
  },
}))

const MenuPages = ({ openSidebar }: { openSidebar: boolean }) => {
  const { id } = useParams()
  const pages: Page[] = [
    {
      label: "Copmany",
      isRirector: false,
      path: `/company/${id}`,
      icon: <MdDashboard size={25} />,
    },
    {
      label: "Messages",
      isRirector: false,
      path: `/company/${id}/messages`,
      icon: <TiMessages size={25} />,
    },
    {
      label: "Diagrams",
      isRirector: false,
      path: `/company/${id}/diagrams`,
      icon: <BsDiagram3Fill size={25} />,
    },
    {
      label: "Tasks",
      isRirector: false,
      path: `/company/${id}/tasks`,
      icon: <BiTask size={25} />,
    },
    {
      label: "Calendar",
      isRirector: false,
      path: `/company/${id}/calendar`,
      icon: <FaRegCalendarAlt size={25} />,
    },
    {
      label: "Files",
      isRirector: false,
      path: `/company/${id}/files`,
      icon: <LuFile size={25} />,
    },
  ]
  return (
    <List sx={{ width: "100%" }}>
      {pages.map(page => (
        <StyledNavLink
          key={page.path}
          to={page.path}
          end
          className={({ isActive, isPending }) => {
            return `${isPending ? "pending" : isActive ? "active" : ""}`
          }}
          replace
        >
          <ListItem className="list-item" disablePadding>
            <ListItemButton
              sx={{
                justifyContent: openSidebar ? "flex-start" : "center", // Aligns text properly
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon
                className="list-item__icon"
                sx={{
                  minWidth: "auto",
                  paddingRight: openSidebar ? "2rem" : "0rem",
                  transition: "padding 0.4s ease-in-out", // Smooth padding transition
                }}
              >
                {page.icon}
              </ListItemIcon>
              <ListItemText
                primary={page.label}
                hidden={!openSidebar}
                sx={{
                  margin: 0,
                  lineHeight: 0,
                  opacity: openSidebar ? 1 : 0, // Text visibility
                }}
              />
            </ListItemButton>
          </ListItem>
        </StyledNavLink>
      ))}
    </List>
  )
}

export default MenuPages
