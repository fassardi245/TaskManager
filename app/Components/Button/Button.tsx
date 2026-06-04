"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import styled from "styled-components";


interface Props{
    icon? : React.ReactNode;
    name? : string;
    background? : string;
    padding? : string;
    borderRad? : string;
    fw? : string;
    fs? : string;
    click? : () => void;
    type?: "button" | "submit" | "reset"| undefined;
    border?: string;
    color?: string;
}

export default function Button({ icon, name, background, padding, borderRad, fw, fs, click, type, border, color}: Props)
{
    const {theme} = useGlobalState();
    return(
        <ButtonStyled className="relative flex items-center cursor-pointer z-5 transition all duration-500 ease-in-out"
        theme={theme} style={ {background: background, padding: padding || "0.5rem 1rem", borderRadius: borderRad || "0.5rem", fontWeight: fw || "500", fontSize: fs, border: border || "none", color : color || theme.colorGrey0}} onClick={click} type={type}>
            {icon && icon}
            {name}
        </ButtonStyled>
    );
}

const ButtonStyled = styled.button`
    color : ${(props : any) => props.theme.colorGrey2};
    i{
        color : ${(props : any) => props.theme.colorGrey2};
        margin-right: 1rem;
        font-size: 1.5rem;
        transition: all 0.55s ease-in-out;
    }
    &:hover{
        color : ${(props : any) => props.theme.colorGrey0};
        i{
            color : ${(props : any) => props.theme.colorGrey0};
        }
    }
`;