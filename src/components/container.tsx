import React, {ReactNode} from 'react'

export default function Container({ children }: { children: ReactNode }) {
    return (
        <div className={"min-h-[100vh] bg-gradient-to-tr from-violet-900 via-sky-300 to-violet-600 grid grid-cols-1 justify-items-center "}>{children}</div>
    )
}
