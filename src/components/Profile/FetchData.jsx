import { useState } from "react"
import { useEffect } from "react"

function FetchData() {
    const [backgroundImage, setBackgroundImage] = useState('');
    const { avatarSrc, setAvatarSrc, name, setName } = useAvatar();
    const [openDialog, setOpenDialog] = useState(false);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => { 
   fetch()
   .then(Response => Response.json())
   .then(data => setName(data))
   .catch(err => console.log(err))
    }, [])
 
  return (
    <div></div>
  )
}

export default FetchData;