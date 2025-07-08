export interface CreateUserDto {
        username: string,
        email: string,
        password: string,
        avatar_url: string
}

export interface CreatePostDto {
  body: string,
  album_id: number
}

export interface UserDto {
  username: string;
  email: string;
  password: string;
  avatar_url: string;
}
