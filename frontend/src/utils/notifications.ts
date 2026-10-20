const replaceDirectPath = (redirectPath : string) => {
        if(redirectPath && redirectPath.includes("chat")){
            return redirectPath.replace("chat", "messages")
        }else if (redirectPath && redirectPath.includes("profile")){
            return redirectPath.replace("profile", "users")
        }
    return redirectPath
}

export default replaceDirectPath