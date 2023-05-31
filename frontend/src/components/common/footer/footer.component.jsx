import { styled } from "styled-components"

export const FooterContainer = styled.footer`
    
background-color: #fffefe;
  box-shadow: 0 0 1px 1px rgba(33, 41, 63, 0.1);
  height: 8rem;
   
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
text-align:center;
    font-size:1.6rem;
`

export const Footer =()=>{
    return(
        <FooterContainer>&copy; {new Date().getFullYear()}-YC Deals. Made with ❤️ using Reclaim Protocol</FooterContainer>
    )
}