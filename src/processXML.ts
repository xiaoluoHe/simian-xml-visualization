// import * as xml2js from "xml-js";
import { xml2js } from "xml-js";

export function readFile(fileInput: HTMLInputElement, cb: any) {
  if (fileInput && fileInput.files) {
    // start reading the file. When it is done, calls the onload event defined above.
    const reader = new FileReader();
    reader.onload = () => {
      const result = parseXML(reader.result as string);
      if (cb && result.elements?.[0].elements?.[0]) {
        // sort
        cb(result.elements[0].elements[0].elements);
      }
    };
    reader.readAsBinaryString(fileInput.files[0]);
  }
}

export function parseXML(xml: string) {
  try {
    const result = xml2js(preprocessSimianXML(xml));
    console.log(result);
    return result;
  } catch (e) {
    throw Error(`xml2js error: ${e}`);
  }
}

export function preprocessSimianXML(xml: string) {
  let result = xml;
  if (xml) {
    const index = xml.indexOf('<simian version="4.0.0">');
    if (index > 0) {
      result = xml.slice(index);
    }
  }
  return result;
}
