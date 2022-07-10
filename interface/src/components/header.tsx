import { ConnectWallet } from "./connect-wallet";

const Header = () => {
  return (
    <header className="py-2 pt-4">
      <div className="flex container items-center justify-between mx-auto">
        <div>
          <a
            href="/"
            className="text-3xl bg-rose-100 bg-opacity-50 border-white p-1 px-4 rounded-full border-2 flex"
          >
            🦄
          </a>
        </div>

        <div>
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
};

export default Header;
