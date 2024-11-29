import TODO from "@/components/TODO";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-start items-start">
      <TODO
        done={false}
        title="Buy milk"
        description="Milk is expensive"
        due={new Date()}
      />
    </div>  
  );
}
