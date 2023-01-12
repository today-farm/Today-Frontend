

export function PageLink(props :any) {
    
      
    return (
        <>
            <img onClick={props.path} 
            src={props.img_source} alt="" style={{
                width: `${props.width}`
            }}/>
        </>
    )
}