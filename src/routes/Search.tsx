import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description: string;
        imageLinks?: {
            thumbnail?: string;
            small?: string;
        };
    };
};

function Search() {
    // query string으로 둘어온 값을 꺼내오기 위해서  useSearchParams를 사용
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
    // useParams를 사용할 때는 const {id}= useParams();
    // useSearchParams는 useState와 사용법이 동일
    const [params, setParams] = useSearchParams(); // queryString내용이 params에 담겨 나옴
    const k = params.get("keyword"); // "수학"이라는게 있을 수도 있지만,  없을 수도 있음

    // keyword준비 됬으니, API를 통해 요청한 정보를 받아다가 화면에 출력만 해주면 됨
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState<BookItem[]>([]);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${k}&maxResults=20&key=${API_KEY}`)
            .then(res => res.json())
            .then(json => {
                setList(json.items);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [k, API_KEY]);
    useEffect(() => {
        console.log(list);
    }, [list]);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>
                검색 결과 : <span>{k}</span>
            </h1>
            <div>
                {list.map((book: BookItem) => (
                    <div key={book.id}>
                        <div>{book.volumeInfo.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
