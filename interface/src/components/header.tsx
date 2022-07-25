import ConnectWalletButton from "./connect-wallet-button";

const Header = () => {
  return (
    <header className="py-2 pt-4">
      <div className="flex container items-center justify-between mx-auto">
        <div>
          <a
            href="/"
            className="text-3xl backdrop-blur-sm bg-opacity-50 border-white p-1 px-4 rounded-full border-2 justify-center h-[60px] bg-white w-[60px] flex items-center hover:animate-wiggle"
          >
            👋🏼
          </a>
        </div>

        <div>
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
