import { ReactNode, useEffect, useMemo, useState } from "react";
import { fetchData } from "../../../apis";
import { IData } from "../../../apis/interfaces";

const useSearch = () => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    const initializeData = async () => {
        const response = await fetchData();
        setData(response);
    };
    const getFormattedJSX = (value: string) => {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: value.replace(
                        new RegExp(query, "gi"),
                        (match: string) => {
                            return `<span class="highlight">${match}</span>`;
                        }
                    )
                }}
            ></div>
        );
    };

    const getFilteredData = useMemo(() => {
        const filteredData: ReactNode[] = [];

        data.forEach((item: IData) => {
            let doesItemMatch = item.items.some((i: string) =>
                i.includes(query)
            );
            let doesIdMatch = item.id.includes(query);
            let doesNameMatch = item.name.includes(query);
            let doesAddressMatch = item.address.includes(query);
            let doesPincodeMatch = item.pincode.includes(query);
            if (
                doesIdMatch ||
                doesNameMatch ||
                doesAddressMatch ||
                doesPincodeMatch ||
                doesItemMatch
            ) {
                filteredData.push(
                    <>
                        <div className="id">
                            {doesIdMatch ? getFormattedJSX(item.id) : item.id}
                        </div>
                        <div className="name">
                            {doesNameMatch
                                ? getFormattedJSX(item.name)
                                : item.name}
                        </div>
                        {doesItemMatch && (
                            <div className="item">{query} found in items</div>
                        )}
                        <div className="address">
                            {doesAddressMatch
                                ? getFormattedJSX(item.address)
                                : item.address}
                        </div>
                    </>
                );
            }
        });
        return filteredData.length > 0 ? filteredData : null;
    }, [data, query]);

    useEffect(() => {
        initializeData();
    }, []);

    return { query, setQuery, getFilteredData };
};

export default useSearch;
