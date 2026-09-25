import type { ReactNode, SubmitEventHandler } from "react";

export default interface AuthLayoutType {
    children : ReactNode
    bannerText : string
    title : string
    description : string
    onSubmit : SubmitEventHandler<HTMLFormElement>
}