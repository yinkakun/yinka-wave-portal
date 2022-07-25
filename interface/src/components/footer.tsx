const Footer = () => {
  return (
    <footer className="bg-white/30 backdrop-blur-lg py-3 border-t border-white/80">
      <div className="container uppercase mx-auto flex items-center justify-between text-neutral-600 text-xs">
        <div className="divide-x">
          <span className="pr-4">
            Source code:{" "}
            <a
              href="https://github.com/yinkakun/yinka-wave-portal"
              target="_blank"
            >
              Github
            </a>
          </span>

          <span>
            Contract:{" "}
            <a
              href="https://rinkeby.etherscan.io/address/0xa0587e7Fb520A38a1CdeBbD85f5A2C0598868089"
              target="_blank"
            >
              Etherscan
            </a>
          </span>
        </div>

        <span>
          Me:{" "}
          <a href="https://twitter.com/__yinks__" target="_blank">
            Twitter
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
