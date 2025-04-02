import React, {ReactNode} from 'react'

export default function Container({ children }: { children: ReactNode }) {
    return (
        <div className={"min-h-screen bg-gradient-to-tr from-violet-900 via-sky-300 to-violet-600 flex flex-col justify-items-center items-center"}>
            {children}
        </div>
    )
}
