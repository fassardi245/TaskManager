"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import menu from "@/app/utils/menu";
import styled from "styled-components";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../Button/Button";
import { logout } from "@/app/utils/Icons";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";

export default function SideBar() {
    const router = useRouter();
    const pathname = usePathname();
    const handleClick = (link: string) => {
        router.push(link);
    };
    const Menu = menu;
    const {theme} = useGlobalState();
    const {signOut} = useClerk();
    const {user} = useUser();
    const {firstName, lastName, imageUrl} = user || {firstName: "", lastName: "", imageUrl: undefined};
    return (
        <SidebarStyled theme={theme}>
            <div className="profile group">
                <div className="profile-overlay opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                <div className="relative z-10 inline-block overflow-hidden rounded-full w-[70px] h-[70px] flex-shrink-0 transition-all duration-500 ease-in-out">
                <img className="rounded-full transition-all duration-500 ease-in-out hover:scale-110" width={70} height={70} src= {imageUrl} alt="Logo" />
                </div>
                <div className="user-btn absolute z-20 top-0 left-0 w-full h-full">
                    <UserButton 
                        appearance={{
                            elements: {
                                rootBox: {
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                },
                                userButtonTrigger: {
                                    width: "100% !important",
                                    height: "100% !important",
                                    position: "absolute",
                                    inset: 0,
                                    opacity: 0,
                                    zIndex: 20,
                                    cursor: "pointer",
                                },
                                userButtonBox: {
                                    width: "100%",
                                    height: "100%",
                                }
                            }
                        }}
                    />
                </div>
                <h1 className="capitalize relative z-10 ml-[0.8rem] flex flex-col text-[clamp(1.2rem,4vw,1.4rem)] leading-none">
                    {firstName} {lastName}
                </h1>
            </div>
            <ul>
                {Menu.map((item: any) => {
                    const link = item.link;
                    return (
                    <li className={`nav-item ${pathname === link ? "active" : ""}`}
                    key={item.id} onClick={()=>{handleClick(link)}}>
                        {item.icon}
                        <Link href={link}>
                            {item.title}
                        </Link>
                    </li>
                    );
                })}
            </ul>
            <div className="sign-out relative m-6">
                <Button
                    name={"Sign Out"}
                    type={"submit"}
                    padding={"0.4rem 1rem"}
                    borderRad={"0.8rem"}
                    fw={"500"}
                    fs={"1.2rem"}
                    icon={logout}
                    click={()=>{signOut(()=>router.push("/signin"))}}
                />
            </div>
        </SidebarStyled>
    );
}

const SidebarStyled = styled.nav`
    position: relative;
    width: ${(props : any) => props.theme.sidebarWidth};
    background-color: ${(props : any) => props.theme.colorBg2};
    border: 2px solid ${(props : any) => props.theme.borderColor2};
    border-radius: 1rem;
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    color : ${(props : any) => props.theme.colorGrey3};
    
    .profile{
        margin: 1.5rem; 
        padding: 1rem 0.8rem; 
        position: relative; 
        border-radius: 1rem; 
        cursor: pointer; 
        font-weight: 500; 
        color: ${(props : any) => props.theme.colorGrey0}; 
        display: flex; 
        align-items: center;

        .profile-overlay{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(10px);
            z-index: 0;
            background-color: ${(props : any) => props.theme.colorBg3};
            border-radius: 1rem;
            border: 2px solid ${(props : any) => props.theme.borderColor2};
        }
    }
        .nav-item{
            position: relative;
            padding: 0.8rem 1rem 0.9rem 2.1rem;
            margin: 0.3rem 0;
            display: grid;
            grid-template-columns: 40px 1fr;
            cursor: pointer;
            align-items: center;
                &::after{
                    position: absolute;
                    content: "";
                    top: 0;
                    left: 0;
                    width: 0;
                    height: 100%;
                    background-color: ${(props : any) => props.theme.activeNavLinkHover};
                    z-index: 1;
                    transition: all 0.3s ease-in-out;
                }  
                &::before{
                    position: absolute;
                    content: "";
                    top: 0;
                    right: 0;
                    width: 0%;
                    height: 100%;
                    background-color: ${(props : any) => props.theme.colorGreenDark};
                    border-bottom-left-radius: 5px;
                    border-top-left-radius: 5px;
                }
                    a {
                        font-weight: 500;
                        transition: all 0.3s ease-in-out;
                        z-index: 2;
                    }

                i {
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    color: ${(props : any) => props.theme.colorIcons};
                }

                &:hover{
                    &::after{
                    width: 100%;
                    }
                }
        }
        .active{
            background-color: ${(props : any) => props.theme.activeNavLink};
            
            i, a {
                color: ${(props : any) => props.theme.colorIcons2};

            }
        }
            .active::before {
                width: 0.3rem;
            }

            > button {
                margin: 1,5rem;
            }
`;