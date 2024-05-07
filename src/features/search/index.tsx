import Dropdown from "../../components/dropdown";
import { StyledInput, StyledPlaceholder } from "../../style";
import { StyledContainer } from "./style";
import useSearch from "./hooks/useSearch";

const Search = () => {
    const { query, setQuery, getFilteredData } = useSearch();
    return (
        <StyledContainer>
            <StyledInput
                type="text"
                placeholder="Search users by name, address, pincode, ID or items"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query ? (
                getFilteredData ? (
                    <Dropdown data={getFilteredData} />
                ) : (
                    <StyledPlaceholder>No data</StyledPlaceholder>
                )
            ) : null}
        </StyledContainer>
    );
};
export default Search;
