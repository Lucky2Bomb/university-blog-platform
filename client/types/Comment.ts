export interface IComment {
    id: number,
    author: string,
    authorPosition: string,
    text: string,
    publicationId: number,
    userId: number,
    createdAt: string,
    updatedAt: string
}

export interface ICommentsResponse {
    comments: IComment[],
    allCount: number,
    currentCount: number,
    offset: number
}