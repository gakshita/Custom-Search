import { ReactNode, useEffect, useRef, useState } from "react";
import { StyledContainer } from "./style";

interface IDropdownProps {
    data: ReactNode[];
}

const Dropdown: React.FC<IDropdownProps> = ({ data }) => {
    const [cursor, setCursor] = useState(-1);
    const cursorRef = useRef(-1);

    const scrollIntoView = (index: number) => {
        const ul = document.getElementById("dataList");
        let li = ul?.getElementsByTagName("li")[index];
        li?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    };

    const updateCursor = (index: number) => {
        setCursor(index);
        cursorRef.current = index;
        scrollIntoView(cursorRef.current);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowUp" && cursorRef.current > 0) {
            updateCursor(cursorRef.current - 1);
        } else if (
            e.key === "ArrowDown" &&
            cursorRef.current < data.length - 1
        ) {
            updateCursor(cursorRef.current + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <StyledContainer id="dataList">
            {data?.map((item, index) => {
                return (
                    <li
                        key={index}
                        className={`drop-item ${cursor == index && "focus"}`}
                        onMouseEnter={() => updateCursor(index)}
                        onMouseLeave={() => updateCursor(-1)}
                    >
                        {item}
                    </li>
                );
            })}
        </StyledContainer>
    );
};
export default Dropdown;
