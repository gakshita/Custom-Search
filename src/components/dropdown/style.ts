import styled from "styled-components";

export const StyledContainer = styled.ul`
    border: 1px solid #424242;
    position: absolute;
    height: 300px;
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
    overflow-y: scroll;

    .highlight {
        color: #129aff;
        font-weight: 600;
    }
    > *:nth-last-child(n + 2) {
        border-bottom: 1px solid #424242;
    }
    .drop-item {
        padding: 20px;
        // border-bottom: 1px solid grey;
        text-align: left;
    }
    .focus {
        background-color: #3b3b3be3;
    }
    .id {
        font-size: 18px;
        font-weight: 500;
    }
    .name {
        font-size: 16px;
        font-style: italic;
        margin-bottom: 10px;
    }
    .address {
        font-size: 14px;
        opacity: 0.7;
    }
    .item {
        font-size: 14px;
        display: flex;
    }
    .item:before {
        content: "";
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #129aff;
        display: inline-block;
        margin: auto 10px auto 0;
    }
`;
