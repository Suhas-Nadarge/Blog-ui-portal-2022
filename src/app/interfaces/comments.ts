export interface Comments {
    user: string,
    date: string,
    content: string,
    postId: number ,
    parent_id: number | null,
    id?:  number
}   