export function TodayDate () {
    const current = new Date();
    const week = ['일','월','화','수','목','금','토'];
    let dayOfWeek = week[current.getDay()];

    const date = `${current.getFullYear()}년 ${current.getMonth()+1}월 ${current.getDate()}일 
    ${dayOfWeek}요일`;
    
    return(
        <>
            <h1>{date}</h1>
        </>
    )
}
// 다시 커밋.