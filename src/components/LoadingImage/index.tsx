import { useState } from "react"

export default function LoadingImg({src,className,style={},styleLoading}:any){
    
    const [loading, setLoading] = useState<boolean>(true)

    return (
        <>
        <div className={"spinner-border text-light "} style={{
            display: (!loading) ? 'none' : 'block',
            ...styleLoading
            
        }} role="status">
        </div>
        <img onLoad={() => {
            setLoading(false)
        }} src={src} className={className} style={{...style,display: (loading) ? 'none' : 'block'}} />
        </>
    )
}