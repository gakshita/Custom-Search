import { ReactNode, useEffect, useRef, useState } from "react";
import { StyledContainer } from "./style";

interface IDropdownProps {
    data: ReactNode[];
}

const Dropdown: React.FC<IDropdownProps> = ({ data }) => {
    const [cursor, setCursor] = useState(-1);
    const [isScrolling, setIsScrolling] = useState(false);
    const cursorRef = useRef(-1);
    const scrollerRef = useRef<NodeJS.Timeout | null>(null);

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

    const handleScroll = () => {
        setIsScrolling(true);
        if (scrollerRef.current) clearTimeout(scrollerRef.current);

        scrollerRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 250);
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        const element = document.querySelector("ul#dataList");
        element?.addEventListener("scroll", () => handleScroll());

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            element?.removeEventListener("scroll", () => handleScroll());
            scrollerRef.current && clearTimeout(scrollerRef.current);
        };
    }, []);

    return (
        <StyledContainer id="dataList">
            {data?.map((item, index) => {
                return (
                    <li
                        key={index}
                        className={`drop-item ${cursor == index && "focus"}`}
                        onMouseEnter={() => !isScrolling && updateCursor(index)}
                        onMouseLeave={() => !isScrolling && updateCursor(-1)}
                    >
                        {item}
                    </li>
                );
            })}
        </StyledContainer>
    );
};
export default Dropdown;
