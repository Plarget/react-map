import axios from "axios"

const axiosAuth = axios.create()

axiosAuth.interceptors.request.use((config) => {
  const localstorageToken = localStorage.getItem("token")

  if (localstorageToken) {
    const token = JSON.parse(localstorageToken)
    console.log(token)

    config.headers.Authorization = `Bearer ${token.state.token}`
  }

  return config
})

export default axiosAuth