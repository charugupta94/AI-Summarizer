import { FileUploadDemo } from "@/component/fileUpload";
import Sidebar from "@/component/sidebar";
import React from "react";

const page = () => {
  return (
    <div>
      <main className="w-screen h-screen bg-blue-200 flex ">
        <div className="bg-amber-300 h-screen w-2/6 p-7">
          PDF Summarizer
          <Sidebar />
        </div>
        <div className="h-screen w-2/3">
          <div className="p-3 ">
            <FileUploadDemo />
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
