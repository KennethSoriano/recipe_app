export const useGetUserID = () => {
    const userID = window.localStorage.getItem('userID')
    return userID
}