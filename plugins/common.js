export default ({ app }, inject) => {
    inject('scroolToBottom', (vuetify) => {
        setTimeout(()=>{
            const prevHeight = document.body.scrollHeight
            let cnt = 0
            const timerId = setInterval(()=>{
                cnt++
                console.log(prevHeight)
                if (prevHeight !== document.body.scrollHeight){
                    console.log(document.body.scrollHeight)
                    vuetify.goTo(document.body.scrollHeight)
                    clearInterval(timerId)
                    return
                }
                if (cnt >= 20) {
                    clearInterval(timerId)
                }
            },200)
        }, 200)
    })
}