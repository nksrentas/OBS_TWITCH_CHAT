export default interface Message {
  username: string;
  context: {
    color: string
    mod: boolean
    subscriber: boolean
    turbo: boolean
    badges: object
  };
  message: string
}