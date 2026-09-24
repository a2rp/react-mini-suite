import { createElement } from "react";
import { FaCodepen, FaCoffee, FaEnvelope, FaFacebook, FaGithub, FaGlobe, FaHandHoldingHeart, FaLinkedin, FaPatreon, FaYoutube } from "react-icons/fa";
import { Styled } from "./styled";

const connectLinks = [["Portfolio", "https://www.ashishranjan.net/", FaGlobe], ["GitHub", "https://github.com/a2rp", FaGithub], ["CodePen", "https://codepen.io/ash1198", FaCodepen], ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", FaLinkedin], ["Facebook", "https://www.facebook.com/theash.ashish/", FaFacebook], ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", FaYoutube], ["Email", "mailto:ash.ranjan09@gmail.com", FaEnvelope]];
const supportLinks = [["Support", "https://a2rp-donation-page.netlify.app/", FaHandHoldingHeart], ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", FaCoffee], ["Patreon", "https://www.patreon.com/a2rp", FaPatreon]];

const IconLinks = ({ links }) => <Styled.IconLinks>{links.map(([label, href, Icon]) => { const external = !href.startsWith("mailto:"); return <a key={label} href={href} title={label} aria-label={label} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{createElement(Icon, { "aria-hidden": true })}</a>; })}</Styled.IconLinks>;

export default function Footer() {
    return <Styled.Wrapper>
        <Styled.Top><div><Styled.Title>React Mini Suite</Styled.Title><Styled.Text>Focused frontend apps, utilities and games in one place.</Styled.Text></div><Styled.Groups><div><Styled.Label>Connect</Styled.Label><IconLinks links={connectLinks} /></div><div><Styled.Label>Support</Styled.Label><IconLinks links={supportLinks} /></div></Styled.Groups></Styled.Top>
        <Styled.Bottom>Copyright &copy; {new Date().getFullYear()} <a href="https://www.ashishranjan.net" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></Styled.Bottom>
    </Styled.Wrapper>;
}