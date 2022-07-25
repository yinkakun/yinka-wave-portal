import Header from "../components/header";
import SendWave from "../components/send-wave";
import WaveList from "../components/wave-list";
import WaveCount from "../components/wave-count";
import WaveHeader from "../components/wave-header";
import Footer from "../components/footer";

const Index = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex gap-4 container items-center justify-center mx-auto grow flex-col">
        <WaveHeader />
        <SendWave />
        <WaveCount />
        <WaveList />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
