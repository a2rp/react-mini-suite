import styled from "styled-components";

const scrollbar = `scrollbar-gutter: stable; scrollbar-width: thin; scrollbar-color: transparent transparent; &::-webkit-scrollbar { width: 12px; } &::-webkit-scrollbar-track { background: transparent; } &::-webkit-scrollbar-thumb { background: transparent; border: 3px solid transparent; border-radius: 8px; background-clip: content-box; } &:hover { scrollbar-color: #58677d transparent; } &:hover::-webkit-scrollbar-thumb { background: #58677d; }`;

const Wrapper = styled.div`min-height: 100vh;`;
const Header = styled.header`
    position: fixed; inset: 0 0 auto; z-index: 10000; height: 70px; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 12px clamp(15px, 3vw, 30px); border-bottom: 1px solid #29313d; background: rgba(1, 4, 9, .97);
`;
const LogoLinkWrapper = styled.div`display: flex; align-items: center; gap: 12px;`;
const NavLinkWrapper = styled.button`
    width: 40px; height: 40px; display: grid; place-items: center; color: #dce8f7; border: 1px solid #333; border-radius: 7px; background: transparent; cursor: pointer; transition: color .2s ease, border-color .2s ease, box-shadow .2s ease;
    &:hover { color: #9bd8ff; border-color: #9bd8ff; box-shadow: 0 0 0 3px rgba(155, 216, 255, .12); }
`;
const Heading = styled.h1`
    margin: 0;
    font-size: 14px;
    a { display: inline-flex; align-items: center; gap: 9px; color: #f4f7fb; text-decoration: none; transition: color .2s ease, text-shadow .2s ease; &:hover { color: #9bd8ff; text-shadow: 0 0 14px rgba(155, 216, 255, .2); } }
    img { width: 38px; height: 38px; border: 1px solid #333; border-radius: 9px; background: #0b111b; }
`;
const Main = styled.main`height: 100vh; display: flex; align-items: stretch; overflow: hidden; padding-top: 70px;`;
const NavWrapper = styled.aside`
    width: 0; flex: 0 0 0; z-index: 9999; overflow: hidden; border-right: 1px solid #29313d; background: #010409; transition: width .2s ease, flex-basis .2s ease;
    &.active { width: 270px; flex-basis: 270px; }
    @media (max-width: 999px) { position: fixed; top: 70px; left: 0; height: calc(100vh - 70px); }
    .navInner { width: 270px; height: 100%; overflow-y: auto; padding: 15px; ${scrollbar}; }
`;
const ContentWrapper = styled.section`width: 100%; overflow: auto; padding: 0 clamp(15px, 3vw, 30px); ${scrollbar};`;
const RoutesWrapper = styled.div`min-height: calc(100vh - 90px);`;
const Footer = styled.div`padding: 15px 0 0;`;
const Tuts = styled.div``;

export const Styled = { Wrapper, Header, LogoLinkWrapper, NavLinkWrapper, Heading, Main, NavWrapper, ContentWrapper, RoutesWrapper, Footer, Tuts };