import { useState } from "react"

//default interface from image element

export const LoadingImage: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>,HTMLImageElement> & {
        styleLoading? : React.CSSProperties
    }
> = ( { styleLoading, style, ...props}) => {

    const [loading, setLoading] = useState<boolean>(true)

    return (
        <>
        <div className={"spinner-border text-light "} style={{
            display: (!loading) ? 'none' : 'block',
            ...styleLoading
        }} role="status">
        </div>
        <img onLoad={() => {setLoading(false)}} style={{...style,display: (loading) ? 'none' : 'block'}} {...props} />
        </>
    )
}