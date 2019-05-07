export default interface User {
  email: string,
  name: string,
  isMerchant?: boolean,
  id: number,
  balance?: string,
  public_key?: string
}
