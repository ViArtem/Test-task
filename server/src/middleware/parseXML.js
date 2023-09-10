import xml2js from "xml2js";

export default async function parseXMLOrChangeBody(req, res, next) {
  try {
    if (req.headers["content-type"] === "application/xml") {
      const parsedData = await xml2js.parseStringPromise(req.body, {
        explicitArray: false,
      });

      req.body = parsedData["Document"]["Car"];
    }

    if (!Array.isArray(req.body)) {
      req.body = [req.body];
    }

    next();
  } catch (error) {
    next(error);
  }
}
