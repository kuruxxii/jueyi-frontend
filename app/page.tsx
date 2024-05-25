import Image from "next/image";

export default function LandingPage() {
  return (
    <main>
      <div className="h-screen flex flex-col justify-center items-center space-y-8">
        <h1 className="text-7xl font-bold">觉意阅读</h1>
        <p className="pb-16">一个简短但是有力的介绍文本</p>
      </div>
      <div className="">
        <h2>广告</h2>
        <p>landing, register, login</p>
      </div>
    </main>
  );
}
