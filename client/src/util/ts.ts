export interface User{
    _id: string,
    name: string,
    email: string,
    success?: number,
    fail?: number,
    created_at:string,
    updated_at: string,
    _v:number,
  } 

  export interface Tweet {
    _id: string,
    text: string,
    liked: boolean,
    likesCount: number,
    repliesCount: number,
    images: string[],
    userRef: string,
    createdAt: string,
    updatedAt: string,
    _v: number,
    
  }
  
  export interface Reply {
  
    _id: string,
    text: string,
    createdAt: string,
    updatedAt: string,
    userRef: string,
    tweetRef: string,
    _v: number,
  
  }
   
export interface Err {
  location: string;
  msg: string;
  param: string;
  value: string;
}
export interface Question {
  
  _id: string,
  text: string,
  createdAt: string,
  updatedAt: string,
  userRef:string,
  answerRef:string,
  _v: number,

}
 
export interface Answer {
  
  _id: string,
  text: string,
  createdAt: string,
  updatedAt: string,
  userRef:string,
  _v: number,

}
 