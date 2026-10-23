const closeMenu = () => (document.activeElement as HTMLElement | null)?.blur();

export const formatMessageTime = (time : string) =>{
    const formattedTime = new Date(time).toLocaleDateString([] ,{
        hour : "2-digit",
        minute : "2-digit"
    })
    return formattedTime
}

export default closeMenu