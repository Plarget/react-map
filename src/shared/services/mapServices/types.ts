type TDataRoutesPoint = {
  id: number,
  date_start: string,
  date_end: string
}

export type TMapServices = {
  getRoutesPoint: (data: TDataRoutesPoint) => Promise<{ refresh_token: string, token: string }>
}