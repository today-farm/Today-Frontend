

export function PageLink(props :any) {
    
    return (
        <>
            <props.icon style = {{width: `${props.width}`}} onClick={props.path}></props.icon>
        </>
    )
}