import { Fragment } from "react";

const WaveHeader = () => {
  return (
    <Fragment>
      <h1 className="text-lg flex items-center gap-2 uppercase">
        <span className="text-4xl w-[80px] h-[80px] flex items-center justify-center rounded-full p-2 bg-white border-2 border-rose-500 bg-opacity-70 backdrop-blur select-none relative z-20 animate-wiggle ">
          <span className="-scale-x-[1]">👋🏼</span>
        </span>
        <span className="bg-rose-500 h-[70px] flex items-center rounded bg-opacity-80 backdrop-blur-sm relative z-10 px-20 p-2 text-rose-50 xrounded-full -mx-20 ">
          Wave at Me!
        </span>
        <span className="text-4xl w-[80px] h-[80px] flex items-center justify-center rounded-full p-2 bg-white border-2 backdrop-blur bg-opacity-70 select-none -translate-x-6 relative z-20 animate-wiggle border-rose-500">
          <span className="scale-x-[1]">👋🏼</span>
        </span>
      </h1>
      <p className="max-w-md text-center text-sm text-neutral-600">
        Hi fren! I'm Yinks. You can wave at me with a message on the Rinkeby
        network. If you're lucky, you might even get some RinkebyETH
      </p>
    </Fragment>
  );
};

export default WaveHeader;
