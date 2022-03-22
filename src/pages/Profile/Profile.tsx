import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar"

export default function Profile() {
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loStorage, setLoStorage] = useState(JSON.parse(localStorage.getItem('user') as string));
    
    useEffect(() => {
        setLoading(true);
        return () => {
            setLoading(false);
        }
    })
   
    return (
        <>
        <Sidebar />

        </>
    )
}