export const state = () => ({
    tweetList: [],
    youtubeList: []
})

export const mutations = {
    add(state, {type, message}) {
        console.log(type, message)
        if (type === "twitter") {
            state.tweetList.push(message)
        }else{
            state.youtubeList.push(message)
        }
    }
}