import { Show } from "solid-js";

function List(props: {
  result: ISimianSet[];
  limitLineCount?: number;
  sort?: boolean;
}) {
  if (props.sort !== false && props.result && props.result.length) {
    props.result.sort(
      (b, a) => a.attributes.lineCount - b.attributes.lineCount
    );
  }
  return (
    <>
      <div id="result-table">
        {props.result.map((set) => {
          const { attributes, elements } = set;
          const { lineCount } = attributes;
          return (
            <>
              <Show
                when={
                  elements &&
                  elements.length &&
                  lineCount > (props.limitLineCount ?? 0)
                }
              >
                <h2> Duplicate Line Count: {lineCount}</h2>

                {elements.map((element) => {
                  const { sourceFile, startLineNumber, endLineNumber } =
                    element.attributes;
                  return (
                    <>
                      <div>
                        {sourceFile} (Line:{startLineNumber} - Line:
                        {endLineNumber})
                      </div>
                    </>
                  );
                })}
                <div style="margin:10px 0 0 0;height: 1px; background-color: rgba(229,231,235,0.5);"></div>
              </Show>
            </>
          );
        })}
      </div>
    </>
  );
}

export default List;

export interface ISimianSet {
  type: "element";
  name: "set";
  attributes: {
    lineCount: number;
    fingerprint: string;
  };
  elements: ISimianBlock[];
}

export interface ISimianBlock {
  type: "element";
  name: "block";
  attributes: {
    endLineNumber: string;
    startLineNumber: string;
    sourceFile: string;
  };
}
