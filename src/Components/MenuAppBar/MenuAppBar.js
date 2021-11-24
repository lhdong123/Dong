import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { grey } from "@mui/material/colors"
import { styled } from "@mui/system"
import { Grid } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import PropTypes from "prop-types"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import Slide from "@mui/material/Slide"

import { useLocation } from "react-router-dom"

import ClassDetailsTabs, { TabsManagerDownMD } from "./ClassDetailsTabs"
import CreateClassButton from "./CreateClassButton"
import AccountUser from "./AccountUser"

const StyledAppBar = styled(AppBar)`
  background-color: ${grey[900]};
  color: ${grey[100]};
`

const MenuIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  "&:hover": {
    backgroundColor: grey[800],
  },
}))

const MainAppBar = ({ path }) => {
  const pathArr = path.split("/")
  //pathArr.shift();

  switch (pathArr[1]) {
    case "classes":
      const role = localStorage.role
      return <ClassDetailsTabs role={role} />
    default:
      return (
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          textAlign="left"
        >
          Classroom
        </Typography>
      )
  }
}

const HideOnScroll = (props) => {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
}

export default function MenuAppBar({ handleRender }) {
  let location = useLocation()
  const theme = useTheme()
  let isLogin = null;
  const role = localStorage.getItem("role")

  // isLogin là social hoặc login bình thường
  if(localStorage.getItem("isSocialLogin"))
  {
    isLogin = JSON.parse(localStorage.isSocialLogin);
  }
  else if(localStorage.getItem("isLogin"))
  {
    console.log("create button")
    isLogin = JSON.parse(localStorage.isLogin);
  }


  if (isLogin === null) {
    return null
  } else {
    return (
      <>
        <HideOnScroll>
          <StyledAppBar elevation={0} position="sticky">
            <Toolbar>
              <MenuIconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </MenuIconButton>
              <MainAppBar path={location.pathname} />
              <CreateClassButton handleRender={handleRender} />
              <AccountUser />
            </Toolbar>
            <Grid
              container
              justifyContent="center"
              style={{ marginBottom: theme.spacing(1) }}
            >
              <TabsManagerDownMD role={role} gridNumber={12} />
            </Grid>
          </StyledAppBar>
        </HideOnScroll>
      </>
    )
  }
}
