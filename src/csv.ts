import { ISimianSet } from "./List";

export function getCSV(input: ISimianSet[]) {
  let csv = "lineCount,startLine,endLine,path,tags\n";
  if (input && input.length) {
    input.forEach((set) => {
      const { attributes = {} as ISimianSet["attributes"], elements } = set;
      if (elements && elements.length) {
        elements.forEach((element, index) => {
          const { sourceFile, startLineNumber, endLineNumber } =
            element.attributes;
          if (index === 0) {
            csv += `${attributes.lineCount},${startLineNumber},${endLineNumber},${sourceFile}\n`;
          } else {
            csv += `,${startLineNumber},${endLineNumber},${sourceFile}\n`;
          }
        });
      }
    });
  }
  return csv;
}
