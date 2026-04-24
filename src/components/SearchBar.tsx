import { useNavigate } from "react-router";
import styles from "./SearchBar.module.css";
import { type ChangeEvent, type SubmitEvent, useState } from "react";

// 사용자에 입력을 받는것
function SearchBar() {
    const navigate = useNavigate(); // navigate라고 하는 변수에 이동에 관련된 기능 담아줘야함
    const [keyword, setKeyword] = useState(""); // input 입력 되는 값을

    const onChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        // 사용자가 입력한 값을 받아다가, keyword라고 하는 state에 저장
        // 사용자가 입력한 값을 => event.target.value
        setKeyword(event.target.value);
    };

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        // form onSubmit라고 하는 기능은, 브라우저 축에 기본 기능이 "새로고침 하고 전달" 이 있음
        // 이걸 하지 못하도록 해야 함.
        event.preventDefault();

        // 사용자가 그냥 엔터 처버리는 경우
        //  생각보다 , 이 input에 스페이스바를 넣는 애들도 엄청 많음 "수학" => " 수학"  "수학 "
        // string의 맨 앞과 맨 뒤에 존재할 수 있는 공백을 제거하는 메서드 : trim()
        // "" 에서 사용자가 enter -> keyword.trim() -> ""   -> if (keyword.trim()) ->  false
        // " "에서 사용자가 enter -> keyword.trim() -> ""
        // if (!keyword.trim()) return; // trim을 했더니, 값이 없으면 빈 스트림 이면 return으로 끝내라
        const k = keyword.trim();
        if (!k) return;
        // keyword을 활용해서 사용자를 강제 이동
        // 원래 URL은 한글이 X 않된다. 영어와 몇가지의 특수문자 만 가능
        // 해석을 할 수 있도록 영어람 몇가지의 특수문자를 이용해 변환 작업이 필요함 -> encodeURIComponent()
        navigate(`/search?keyword=${encodeURIComponent(k)}`);
    };



    return (
        <form className={styles.box} onSubmit={onSubmit}>
            <input className={styles.input} onChange={onChange} />
            <button type={"submit"} className={styles.button}>
                검색
            </button>
        </form>
    );
}

export default SearchBar;
