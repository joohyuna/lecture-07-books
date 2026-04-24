import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// JSON에는 값이 있음 때만 보여 준다. 없을 때는 없다가 아니라 아얘 보여주지 않음
type BookType = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        publishedDate: string;
        imageLinks?: {
            thumbnail?: string;
            smallThumbnail?: string;
        };
    };
};

type ApiResponseType ={items: BookType[]};  // 대부분 type으로 만든 초록색 대부분 객체이다.

function Search() {
    // 사용자가 요청한 키워드를 받아서, 그것을 가지고 google API요청을 하고, 받아온 결과를 화면에 출력해주는 일
    // query string으로 둘어온 값을 꺼내오기 위해서  useSearchParams를 사용

    // useParams를 사용할 때는 const {id}= useParams();
    // useSearchParams는 useState와 사용법이 동일
    const [searchParams, setSearchParams] = useSearchParams(); // queryString내용이 params에 담겨 나옴

    const keyword = searchParams.get("keyword"); // "수학"이라는게 있을 수도 있지만,  없을 수도 있음

    // keyword준비 됬으니, API를 통해 요청한 정보를 받아다가 화면에 출력만 해주면 됨
    //const [loading, setLoading] = useState<boolean>(true);
    const [list, setList] = useState<BookType[]>([]);  // [] 알겠어, 근데 그안에 들어가는 요소의 타입이 뭐야?

    useEffect(() => {
        if (!keyword) {
            //setLoading(false); // 잠깐 빨간줄 무시
            return;
        } // 키워드가 없다면 실행하지 말아라

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`)
            .then(res => res.json())
            .then((json: ApiResponseType)  => {
                setList(json.items);
                //setLoading(false);
            })
            .catch(err => {
                console.log(err);
                //setLoading(false);
            });
    }, [keyword]);

    // 로딩에 대해서 처리를 해줘야 하나?  속도가 너무 빠르면 로딩을 넣지 않아도 되는것도 좋다
    // 사용자에게는 로딩이 여기서는 않좋을수도 있다
    // 로딩이 true
    //if (loading) return <div>Loading....</div>

    // 로딩이 false
    // 값을 못 가져 왔을 때?

    return<div className={styles.wrap}>
        <h3>검색 결과 : {keyword}</h3>

        {/* 검색 결과 (책 목록) 출력 */}
        {/* 데이터가 도착했는지 안했는지, 목폭이 있는지 없는지 판단 해줘야 되나? */}
        {list.length === 0 && (<div>검색 결과가 없습니다.</div>)}
        {list && list.map(book => ())}
        {/* map이가고 하는 메소드는 꼭 대상이 array여야만 쓸수 있으니, list && 로 체크를 해줄땐, list가 null이 되나?를 생각해봐야 겠지만, 여기서 모든 조건을 따져봤을 때 list는 무조건 array이긴 하지만 구지 논리곱으로 체크해줄 필요가 없다. */}
    </div>
}

export default Search;
