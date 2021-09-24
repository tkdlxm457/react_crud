import { useState } from 'react';

export const User = (props) => {
    const { users } = props;

    console.log(users);

    

    
    /**
     * 입력값
     */ 
    const [inputValue, setInputValue] = useState("");

    /**
     * 저장한다.
     */
    const save = (event) => {
    
    }

    return (
        <>
            <input 
            type="text" 
            placeholder="아이디를 입력하시오"
            value={inputValue} 
            onChange={(event) => {
                setInputValue(event.target.value);
            }} />
            

            <button type="button" onClick={(event) => {
                event.preventDefault();
                save()
            }}>
            저장
            </button>
        </>
    )
}


