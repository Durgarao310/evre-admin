import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function UpdateStaff() {
    const { id } = useParams()
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [fullName, setFullName] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errormsg, setErrormsg] = useState("")
    const [ploading, setPloading] = useState(false)

    const history = useHistory()

    useEffect(() => {
        user()

    }, [])

    const user = async () => {
        try {
            setPloading(true)
            const resp = await axios.get(`https://evre.wielabs.tech/api/v1/staff/${id}`)
            setPloading(false)
            setFullName(resp.data.res[0].fullName)
            setEmail(resp.data.res[0].email)
            setPhone(resp.data.res[0].phone)

        } catch (error) {
            setPloading(false)
            setErrormsg("please, try agin!")
            setError(true)
        }
    }

    const close = () => {
        setError(false)
        setErrormsg("");
    }

    async function submitLogin(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.patch(`https://evre.wielabs.tech/api/v1/staff/${id}`, { email, fullName, phone })
            setLoading(false)
            history.push('/')
        } catch (error) {
            setLoading(false)
            setErrormsg("email alredy exist or phone number must be 10 numbers")
            setError(true)
        }
    }

    return (
        <div className="add_staff_parent">
            <Box >
                {error && <Alert
                    severity="warning"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={close}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {errormsg && errormsg}
                </Alert>}
            </Box>
            {ploading ?
                <p>loading ...</p>

                :

                <form onSubmit={submitLogin}>
                    <div className="input_main">
                        <label>Email:</label>
                        <input className="input" type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="example@gmail.com" />
                    </div>
                    <div className="input_main">
                        <label>Name:</label>
                        <input className="input" type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="full name" required />
                    </div>
                    <div className="input_main">
                        <label>Phone:</label>
                        <input className="input" type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="mobile number" required />
                    </div>
                    <div className="input_main">
                        {
                            loading ?

                                <Button variant="contained" disabled>Loafing ... </Button>

                                :

                                <Button variant="contained" type="submit">submit</Button>
                        }
                    </div>
                </form>
            }
        </div>

    )
}
