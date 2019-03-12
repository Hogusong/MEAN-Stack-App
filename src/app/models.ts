export interface USER {
  id?: string,
  email: string, 
  password: string
}

export interface POST {
  id?: string,
  title: string,
  imagePath: string,
  content: string,
  creator: string  
}
