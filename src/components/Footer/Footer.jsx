import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container footer__container">
        <p>All rights reserved</p>
        <p>Copyright &copy; {year} DTech</p>
      </div>
    </footer>
  );
};
export default Footer;