import { Show, createSignal } from "solid-js";
import { readFile } from "./processXML";
import List, { ISimianSet } from "./List";
import "./App.css";
import { getCSV } from "./csv";

function App() {
  let ref: HTMLInputElement;
  const [result, setResult] = createSignal<ISimianSet[]>();
  const [limitLineCount, setLimitLineCount] = createSignal<number>(0);
  const [csv, setCSV] = createSignal<string>();

  return (
    <>
      <div>
        <p>Select a local CSV File</p>
        <input
          id="csv"
          ref={ref}
          type="file"
          accept=".xml"
          onChange={() => {
            readFile(ref, setResult);
          }}
        ></input>
        <span>minimum duplicate line </span>
        <input
          type="text"
          onchange={(e) => {
            e.target.value &&
              /^\d+$/.test(e.target.value) &&
              setLimitLineCount(Number(e.target.value));
          }}
        ></input>
        <button
          style="margin-left: 20px"
          onclick={() => {
            setCSV(getCSV(result() as ISimianSet[]));
            const link = document.createElement("a");
            link.setAttribute(
              "href",
              "data:text/csv;charset=utf-8," +
                encodeURIComponent(csv() as string)
            );
            link.setAttribute("download", "data.csv");
            link.style.display = "none";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          download csv
        </button>
        <Show when={result()}>
          <List
            result={result() as ISimianSet[]}
            limitLineCount={limitLineCount()}
          ></List>
        </Show>
      </div>
    </>
  );
}

export default App;
