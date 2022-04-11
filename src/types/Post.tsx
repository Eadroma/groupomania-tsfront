export type Post = {
    date: string;
    id: number;
    userName: string;
    userEmail: string;
    imgUrl: string | null;
    likes: number;
    userLiked: JSON;
    comments: JSON;
    textContent: string;
    userId: number;
};
