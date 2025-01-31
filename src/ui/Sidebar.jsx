import React from 'react'
import styled from 'styled-components'
import Logo from "../ui/Logo"
import MainNav from "../ui/MainNav"

const StyledSidebar = styled.aside`
    background-color: aliceblue;
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-0);
    grid-row: 1 / -1;
    /* gap: 10rem; */
`

export default function Sidebar() {
  return (
    <StyledSidebar>
        <Logo/>
        <MainNav/>
    </StyledSidebar>
  )
}
