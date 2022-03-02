export interface LoadAccountByToken {
  loadByToken (accessToken: string, role?: string): Promise<LoadAccountByToken.Result | null>
}

export namespace LoadAccountByToken {
  export type Result = {
    id: string
  }
}
