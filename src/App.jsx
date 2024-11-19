import { split } from "postcss/lib/list";
import "./App.css";
import { requestToGroq } from "./utils/groq";
import { useState } from "react";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { vs as style } from "react-syntax-highlighter/dist/cjs/styles/prism";

function App() {
     const [data, setData] = useState("Nanti jawabannya di sini ");
     const [isHere, setHere] = useState("");
     const [isActive, setIsActive] = useState(false);

     const handleSubmit = async () => {
          let dot = ".";
          const load = "Tunggu bentar";
          // const ai = await requestToGroq(content.value);
          // setData(ai);
          try {
               let outputContent;
               outputContent = "";
               setHere("");
               setData(load);
               const loading = setInterval(() => {
                    setData(load + dot);
                    dot += ".";
                    if (dot == "....") {
                         dot = ".";
                    }
               }, 500);
               const ai = await requestToGroq(content.value);

               setTimeout(() => {
                    setHere(outputContent);
                    clearInterval(loading);
                    const outputArray = ai.split("");
                    outputArray.forEach((out) => {
                         setTimeout(() => {
                              outputContent += out;
                              setData(outputContent);
                              if (outputContent.split("").length == outputArray.length) {
                                   setHere(outputContent);
                              } else {
                                   setHere("");
                              }
                         }, 500);
                    });

                    // setData(ai);
               }, 500);
          } catch (error) {
               setData("Error", error);
          }
     };

     const copy = () => {
          navigator.clipboard.writeText(output.textContent);
          setIsActive(!isActive);
          setTimeout(() => {
               setIsActive(isActive);
          }, 2000);
     };
     return (
          <main className="w-96 md:w-2/3 mx-auto my-5 p-4 font-mono relative">
               <div
                    className={isActive ? "bg-green-600 text-white fixed p-3 rounded-md top-4 left-20 right-20 md:left-[40%] md:right-[40%]" : "bg-green-600 text-white fixed p-3 rounded-md top-4 left-20 right-20 hidden md:left-[40%] md:right-[40%]"}
                    id="alertBox"
               >
                    Konten berhasil disalin
               </div>
               <header className="w-full p-5 bg-gray-800 text-white text-left rounded-md">
                    <h1 className="text-lg md:text-2xl"> Belajar AI pake GROQ API sama React.js</h1>
               </header>
               <div className="w-full outline-1 outline outline-gray-800 my-4 rounded-md overflow-hidden">
                    <input type="text" id="content" className="w-[80%] p-2" placeholder="Tanya aja di sini" />
                    <button className="bg-gray-800 text-white w-[20%] p-2 " onClick={handleSubmit}>
                         Yok🚀
                    </button>
               </div>
               <hr className="border border-gray-800 my-5" />
               <section className="w-full rounded-md border " id="output">
                    {data ? (
                         <SyntaxHighlight lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }} language="swift" style={style} wrapLongLines={true} wrapLines={true}>
                              {data}
                         </SyntaxHighlight>
                    ) : null}
                    {isHere ? (
                         <button onClick={copy} className="bg-gray-800 p-2 text-white absolute right-3 left-3 md:left-[80%] md:right-3 rounded-md">
                              Salin
                         </button>
                    ) : null}
               </section>
          </main>
     );
}

export default App;
