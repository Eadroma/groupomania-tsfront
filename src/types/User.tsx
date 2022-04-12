export type User = {
    coverUrl: string;
    description: string;
    email: string;
    id: number;
    imgUrl: string;
    name: string;
    password: string;
    token: string | null;
    message: { name: string; message: string } | null;
};
