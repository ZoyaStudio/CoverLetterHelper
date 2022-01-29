// import './App.css';
import { useState, useEffect, React } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import Preview from './Preview'
import ControlPanel from './ControlPanel'
import AppContext from './context'
import {
    db,
    signInWithGoogle,
    signOutWithGoogle,
    auth,
} from './firebase-config'

const App = function () {
    const defaultText = {
        companyName: 'Generic Company',
        roleName: 'fullstack engineer',
        companyFocus: 'Your company is so cool because...',
        title: 'software engineer',
        signOffLines: [
            'Please contact me at',
            '123-456-7890',
            'Jane Doe',
            'email@outlook.com',
        ],
        intro: "Hi there, I'm a <title> looking for my next opportunity...",
        bodyParagraphOne: 'Let me tell you about myself...',
        bodyParagraphTwo: 'Furthermore...',
        bodyParagraphThree: null,
        conclusion: '...and I conclude with...',
    }
    const [user, loading, error] = useAuthState(auth)
    const [intros, setIntros] = useState({})
    const [bodyParagraphs, setBodyParagraphs] = useState({})
    const [conclusions, setConclusions] = useState({})
    const [companyName, setCompanyName] = useState(defaultText.companyName)
    const [title, setTitle] = useState(defaultText.title)
    const [roleName, setRoleName] = useState(defaultText.roleName)
    const [companyFocus, setCompanyFocus] = useState(defaultText.companyFocus)
    const [signOffLines, setSignOffLines] = useState(defaultText.signOffLines)
    const [intro, setIntro] = useState(defaultText.intro)
    const [bodyParagraphOne, setBodyParagraphOne] = useState(
        defaultText.bodyParagraphOne
    )
    const [bodyParagraphTwo, setBodyParagraphTwo] = useState(
        defaultText.bodyParagraphTwo
    )
    const [bodyParagraphThree, setBodyParagraphThree] = useState(
        defaultText.bodyParagraphThree
    )
    const [conclusion, setConclusion] = useState(defaultText.conclusion)
    const [isReady, setIsReady] = useState(false)

    const reset = () => {
        setIsReady(false)
        setBodyParagraphs({})
        setConclusions({})
        setIntros({})
        setTitle(defaultText.title)
        setRoleName(defaultText.roleName)
        setSignOffLines(defaultText.signOffLines)
        setCompanyName(defaultText.companyName)
        setCompanyFocus(defaultText.companyFocus)
        setIntro(defaultText.into)
        setBodyParagraphOne(defaultText.bodyParagraphOne)
        setBodyParagraphTwo(defaultText.bodyParagraphTwo)
        setBodyParagraphThree(defaultText.bodyParagraphThree)
        setConclusion(defaultText.conclusion)
    }
    const getData = async (collectionName, id, setter) => {
        const q = query(
            collection(db, collectionName),
            where('userId', '==', id)
        )
        const data = await getDocs(q)
        const newData = {}
        data.docs.forEach((doc) => {
            newData[doc.data().label] = { text: doc.data().text, id: doc.id }
        })
        setter(newData)
    }
    const getUserData = async () => {
        const q = query(
            collection(db, 'users'),
            where('userId', '==', user.uid)
        )
        const data = await getDocs(q)
        setSignOffLines(data.docs.map((doc) => doc.data().signOff)[0])
    }
    useEffect(() => {
        if (user) {
            getData('intros', user.uid, setIntros)
            getData('body paragraphs', user.uid, setBodyParagraphs)
            getData('conclusions', user.uid, setConclusions)
            getUserData()
        }
        setIsReady(true)
    }, [user])

    // console.log("user", user, "loading", loading, "error", error);
    return (
        <Box
            sx={{
                p: 3,
                m: 3,
                bgcolor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: 16,
                // height: '90vh',
            }}
        >
            {user && (
                <Typography>
                    {user.displayName
                        ? `Hello, ${user.displayName}`
                        : 'Please sign in with your Google Account'}
                </Typography>
            )}

            <Button
                type="button"
                onClick={
                    user
                        ? () => {
                              signOutWithGoogle(reset)
                              console.log(
                                  'hit reset',
                                  intro,
                                  bodyParagraphTwo,
                                  conclusion
                              )
                          }
                        : signInWithGoogle
                }
            >
                {user ? 'Logout' : 'Login'}
            </Button>
            <Typography
                align="center"
                variant="h2"
                sx={{
                    mb: 10,
                }}
            >
                Cover Letter Helper
            </Typography>

            <AppContext.Provider
                // eslint-disable-next-line react/jsx-no-constructed-context-values
                value={{
                    setIntros,
                    setBodyParagraphs,
                    setConclusions,
                    intros,
                    bodyParagraphs,
                    conclusions,
                    title,
                    setTitle,
                    companyName,
                    setCompanyName,
                    companyFocus,
                    setCompanyFocus,
                    roleName,
                    setRoleName,
                    intro,
                    setIntro,
                    bodyParagraphOne,
                    setBodyParagraphOne,
                    bodyParagraphTwo,
                    setBodyParagraphTwo,
                    bodyParagraphThree,
                    setBodyParagraphThree,
                    conclusion,
                    setConclusion,
                    signOffLines,
                    setSignOffLines,
                    userId: user ? user.uid : null,
                    userDisplayName: user ? user.userDisplayName : null,
                    getData,
                    getUserData,
                }}
            >
                <Grid
                    container
                    spacing={2}
                    sx={{
                        p: 3,
                    }}
                >
                    {/* <Button
            onClick={() => {
              addData(user ? user.uid : 123);
            }}
          >
            Save Data
          </Button>
          <Button>Delete Data</Button> */}
                    <Grid item xs={12} />
                    <Grid item xs={6}>
                        {isReady && <ControlPanel />}
                    </Grid>
                    <Grid item xs={6}>
                        {isReady && <Preview />}
                    </Grid>
                </Grid>
            </AppContext.Provider>
        </Box>
    )
}

export default App

// export default function BasicGrid() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={2}>
//         <Grid item xs={8}>
//           <Item>xs=8</Item>
//         </Grid>
//         <Grid item xs={4}>
//           <Item>xs=4</Item>
//         </Grid>
//         <Grid item xs={4}>
//           <Item>xs=4</Item>
//         </Grid>
//         <Grid item xs={8}>
//           <Item>xs=8</Item>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
