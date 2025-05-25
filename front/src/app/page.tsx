import { FileUpload } from "@/component/fileUpload";
import React from "react";

const page = () => {
  return (
    <div>
      <main className="w-screen h-screen bg-blue-200 flex ">
        <div className="bg-amber-300 h-screen w-1/3">hi</div>
        <div className="bg-red-500 h-screen w-2/3">
          <div className="p-3 ">
            <FileUpload />
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
