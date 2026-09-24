import styled from "styled-components";

const Wrapper = styled.footer`margin-top: 30px; padding: 26px clamp(15px, 3vw, 35px) 18px; color: #9aa8ba; border-top: 1px solid #29313d; background: #010409;`;
const Top = styled.div`display: flex; justify-content: space-between; gap: 25px; @media (max-width: 700px) { flex-direction: column; }`;
const Title = styled.h2`margin: 0 0 6px; color: #f4f7fb; font-size: 1.25rem;`;
const Text = styled.p`max-width: 360px; color: #7f91a8;`;
const Groups = styled.div`display: flex; flex-wrap: wrap; gap: 24px;`;
const Label = styled.span`display: block; margin-bottom: 8px; color: #cbd7e6; font-size: .7rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;`;
const IconLinks = styled.div`display: flex; flex-wrap: wrap; gap: 7px; a { width: 32px; height: 32px; display: grid; place-items: center; color: #9aa8ba; border: 1px solid #344962; border-radius: 8px; transition: color .2s ease, border-color .2s ease, box-shadow .2s ease; } a:hover { color: #9bd8ff; border-color: #9bd8ff; box-shadow: 0 0 0 3px rgba(155, 216, 255, .12); }`;
const Bottom = styled.div`margin-top: 22px; padding-top: 15px; color: #7f91a8; border-top: 1px solid #29313d; font-size: .78rem; a { color: #f4f7fb; font-weight: 700; text-decoration: none; } a:hover { color: #9bd8ff; }`;

export const Styled = { Wrapper, Top, Title, Text, Groups, Label, IconLinks, Bottom };