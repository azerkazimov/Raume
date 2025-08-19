import SectionHeader from "@/components/ui/section-header";

export default function Project() {
  return (
    <div className="">
      <SectionHeader title="PROJECT" color="#212121" />
      <div className="container">
        <div className="flex xl:mt-[-100px] xl:justify-start justify-center">
          <h4 className="text-[48px] max-w-[341px] xl:ml-[300px]">
            Our last masterpiece.
          </h4>
        </div>
        <div className="flex gap-4 p-8 justify-between">
          <div className="flex flex-col gap-5 w-full">
            <span className="text-base">[01]</span>
            <div className="min-w-[303px]  bg-gray-300 min-h-[200px] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212112]/60  cursor-pointer"></div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <span className="text-base">[02]</span>
            <div className="min-w-[303px] bg-gray-300 min-h-[200px] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212112]/60  cursor-pointer"></div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <span className="text-base">[03]</span>
            <div className="min-w-[303px] bg-gray-300 min-h-[200px] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212112]/60  cursor-pointer"></div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <span className="text-base">[04]</span>
            <div className="min-w-[303px] bg-gray-300 min-h-[200px] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#212112]/60  cursor-pointer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
