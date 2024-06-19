import { useEffect, useState, useRef } from 'react'
import { TextField, Box, Button, Stack, Snackbar } from '@mui/material'
import { Link } from 'react-router-dom'

export default function ChatInput({ generateResponse, setScroll, chat, clearChat }) {

    const [inputs, setInput] = useState('')
    const inputRef = useRef(null)
    const [showSnackbar, setShowSnackbar] = useState(false)

    useEffect(() => {
        inputRef.current.focus()
    }, [])



    const handleSave = () => {

        const chat_history = JSON.parse(localStorage.getItem("messageItem")) || []

        const date = new Date()

        localStorage.setItem('messageItem', JSON.stringify([{ chat: chat, datetime: date }, ...chat_history]))

        clearChat()

        setShowSnackbar(true)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        generateResponse(inputs)
        setInput('')
        setScroll(prev => !prev)
    }



    return (
        <Box px={{ xs: .5, md: 3 }}
            pb={{ xs: 1, md: 3 }}
            flexShrink={0} >
            <Box component={'form'} onSubmit={handleSubmit}>
                <Stack
                    spacing={{ xs: .5, md: 2 }}
                    direction={'row'}
                >
                    <TextField
                        placeholder='Message Bot AI...'
                        sx={{
                            flex: 2,
                            bgcolor: 'primary.light',
                            borderRadius: 2,
                            '& input': {
                                fontSize: { xs: 12, md: 16 },
                                paddingLeft: { xs: 1, md: 2 },
                                paddingRight: { xs: 1, md: 2 },

                            }
                        }}
                        value={inputs}
                        onChange={(e) => setInput(e.target.value)}
                        inputRef={inputRef}
                        required
                    />
                    <Button
                        type='submit'
                        sx={{
                            fontSize: { xs: 12, md: 16 },
                            '@media (max-width:767px)': {
                                minWidth: 0,
                                paddingRight: 1.5,
                                paddingLeft: 1.5,
                            }
                        }}
                        variant='contained'
                    >
                        Ask
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!chat.length > 0}
                        variant='outlined'
                        sx={{
                            fontSize: { xs: 12, md: 16 },
                            '@media (max-width:767px)': {
                                minWidth: 0,
                                paddingRight: 2,
                                paddingLeft: 2,
                            }
                        }}
                    >
                        Save
                    </Button>
                </Stack>
            </Box>

            <Snackbar
                open={showSnackbar}
                message={'Chat is Saved....'}
                autoHideDuration={5000}
                onClose={() => setShowSnackbar(false)}
                action={

                    <Link to="/history">
                        <Button size='small'>See past conversations</Button>
                    </Link>
                }
            />
        </Box>
    )
}