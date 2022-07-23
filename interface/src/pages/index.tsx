import Header from "../components/header";
import Wave from "../components/wave";
import useIsSupportedChain from "../hooks/use-is-supported-chain";

const Index = () => {
  const { isSupportedChain } = useIsSupportedChain();
  return (
    <div className="flex flex-col h-full">
      <Header />
      {isSupportedChain && <Wave />}
    </div>
  );
};

export default Index;
