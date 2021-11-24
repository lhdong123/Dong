import React, { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from "react-router"

import { Grid, Container } from "@mui/material"

import ClassTopic from "./ClassTopic"
import TabPanel from "../TabPanel"
import ClassInfo from "./ClassInfo"
import UpcommingTask from "./UpcommingTask"
import ClassAnnoucement from "./ClassAnnounment"
import { tabsContext } from "../../../../context/TabsContext"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

export default function StreamTabPanel({ value, index }) {
  const [classInfo, setClassInfo] = useState({})
  const { handleClassDetails } = React.useContext(tabsContext)
  let location = useLocation()
  const theme = useTheme()
  const matchUpMD = useMediaQuery(theme.breakpoints.up("md"))
  console.log(process.env.REACT_APP_HOST + location.pathname.replace("/", ""));
  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_HOST + location.pathname.replace("/", "")
        )
        setClassInfo(res.data)
        handleClassDetails(res.data)

        document.title = res.data.className
        return res.data._id === JSON.parse(localStorage.isSocialLogin)._id
      } catch (error) {
        console.error(error)
      }
    }

    const fetchTeacherOfClass = async (classId) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_HOST}classes/teachers-of-class/${classId}`
        )

        return res.data.find(
          (element) => element === JSON.parse(localStorage.isSocialLogin)._id
        )
      } catch (error) {
        console.error(error)
      }
    }

    if (fetchClassDetail()) {
      localStorage.setItem("role", "creator")
    } else if (fetchTeacherOfClass(classInfo._id)) {
      localStorage.setItem("role", "creator")
    } else localStorage.setItem("role", "member")

    // eslint-disable-next-line
  }, [])

  return (
    <TabPanel value={value} index={index}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ClassInfo
              role="creator"
              className={classInfo.className}
              section={classInfo.section}
              subject={classInfo.subject}
              room={classInfo.room}
              inviteCode={classInfo.inviteCode}
            />
          </Grid>

          {matchUpMD && (
            <Grid item xs={3}>
              <UpcommingTask />
            </Grid>
          )}

          <Grid container item md={9} sm={12} spacing={3}>
            <Grid item xs={12}>
              <ClassAnnoucement />
            </Grid>
            <Grid item xs={12}>
              <ClassTopic />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </TabPanel>
  )
}
