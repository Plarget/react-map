import {create} from "zustand"
import {persist} from "zustand/middleware"

export const useUserStore = create(
  persist((set) => ({
      refresh_token: "",
      token: "",
      setTokens: (data: { refresh_token: string, token: string }) => set({...data})
    }), {
      name: "token"
    }
  )
)
