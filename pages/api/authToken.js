
export default async (req, res) => {
    const myCookies = req.headers.cookie;
    const str = myCookies.split('; ');
    const result = {};
    for (let i in str) {
        const cur = str[i].split('=');
        result[cur[0]] = cur[1];
    }


    //get token cookie and return it to be decoded and dispatched in appjs
    if (result['token']){
        res.status(200).json(result['token'])

    }
    else {
        return res.status(500).json({ message: 'This is an error!' });
    }


}
//    const { signIn, isSignedIn, signOut, authToken} = useAuth();

