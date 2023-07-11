const CLIENT_ID = "211248772755-2v8kt21le74akc0pmfcic6pf636lnln8.apps.googleusercontent.com";
const API_KEY = "AIzaSyAmfUZPT8K0dFAhGiUGrvrQ97WZ-P5wvVw";
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";

let tokenClient: { callback: (resp: any) => Promise<void>; requestAccessToken: (arg0: { prompt: string }) => void };
let gapiInited = false;
let gisInited = false;

const loadScript = (src: string, callback?: any) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = src;
    script.onload = () => {
      callback && callback();
      resolve(true);
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const initializeGapiClient = async () => {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
};

const gapiLoaded = () => {
  gapi.load("client", initializeGapiClient);
};

const gisLoaded = () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "",
  });
  gisInited = true;
};

export const searchFile = async (words: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    gapi.client.drive.files
      .list({
        corpora: "user",
        q: `name contains '${words}' and (mimeType = 'application/pdf' or mimeType = 'image/png' or mimeType = 'image/jpeg' or mimeType = 'image/webp' or mimeType = 'image/gif' or mimeType = 'application/vnd.google-apps.folder' or mimeType = 'application/vnd.google-apps.document' or mimeType = 'application/vnd.google-apps.drawing' or mimeType = 'application/vnd.google-apps.presentation' or mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.jam') and trashed = false`,
        fields: `nextPageToken,files(id,name,size,mimeType,thumbnailLink,trashed,imageMediaMetadata,owners,modifiedTime,sharedWithMeTime)`,
        pageSize: 40,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      })
      .then(async (res: { result: any }) => {
        resolve({
          data: res.result,
        });
      })
      .catch((err: any) => {
        reject({
          data: [],
        });
      });
  });
};

export const listFiles = async (type: string, folderId?: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const param = {
      corpora: "user",
      fields: "nextPageToken,files(id,name,size,mimeType,trashed,imageMediaMetadata,owners,modifiedTime,sharedWithMeTime, thumbnailLink,webContentLink)",
      pageSize: 40,
    };
    if (type === "cloud") {
      param.q = `'${
        folderId || "root"
      }' in parents and (mimeType = 'application/pdf' or mimeType = 'image/png' or mimeType = 'image/jpeg' or mimeType = 'image/webp' or mimeType = 'image/gif' or mimeType = 'application/vnd.google-apps.folder' or mimeType = 'application/vnd.google-apps.document' or mimeType = 'application/vnd.google-apps.drawing' or mimeType = 'application/vnd.google-apps.presentation' or mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.jam') and trashed = false`;
    }
    if (type === "share") {
      if (folderId) {
        param.q = `'${folderId}' in parents and (mimeType = 'application/pdf' or mimeType = 'image/png' or mimeType = 'image/jpeg' or mimeType = 'image/webp' or mimeType = 'image/gif' or mimeType = 'application/vnd.google-apps.folder' or mimeType = 'application/vnd.google-apps.document' or mimeType = 'application/vnd.google-apps.drawing' or mimeType = 'application/vnd.google-apps.presentation' or mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.jam') and trashed = false`;
      } else {
        param.q = `sharedWithMe = true and (mimeType = 'application/pdf' or mimeType = 'image/png' or mimeType = 'image/jpeg' or mimeType = 'image/webp' or mimeType = 'image/gif' or mimeType = 'application/vnd.google-apps.folder' or mimeType = 'application/vnd.google-apps.document' or mimeType = 'application/vnd.google-apps.drawing' or mimeType = 'application/vnd.google-apps.presentation' or mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.jam') and trashed = false`;
      }
    }
    gapi.client.drive.files
      .list(
        param
      )
      .then(async (res: { result: any }) => {
        console.log(24566, res);
        resolve({
          data: res.result,
        });
      })
      .catch((err: any) => {
        reject({
          data: [],
        });
      });
  });
};
loadScript("https://apis.google.com/js/api.js", gapiLoaded);
loadScript("https://accounts.google.com/gsi/client", gisLoaded);

export default class googleDrive {
  static _instance: googleDrive;
  //获取实例
  static getInstance() {
    if (!this._instance) {
      this._instance = new googleDrive();
    }
    return this._instance;
  }

  static async auth(type: string, folderId?: string): Promise<any> {
    if (!gapiInited || !gisInited) {
      throw new Error("初始化失败");
    }
    console.log(gapiInited, gisInited);
    return new Promise((resolve) => {
      if (gapi.client.getToken() === null) {
        console.log("----------", gapi.client.getToken());
        tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        console.log("==========", gapi.client.getToken());
        tokenClient.requestAccessToken({ prompt: "" });
      }
      tokenClient.callback = async (resp: any) => {
        if (resp.error !== undefined) {
          throw resp;
        }
        const { data } = await listFiles(type, folderId);
        resolve(data);
      };
    });
  }

  static async listFiles(type: string, folderId?: string) {
    const { data } = await listFiles(type, folderId);
    return data;
  }


  static async searchFiles(words: string): Promise<any> {
    if (!gapiInited || !gisInited) {
      throw new Error("初始化失败");
    }
    console.log(gapiInited, gisInited);
    return new Promise((resolve) => {
      if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        tokenClient.requestAccessToken({ prompt: "" });
      }
      tokenClient.callback = async (resp: any) => {
        if (resp.error !== undefined) {
          throw resp;
        }

        const { data } = await searchFile(words);
        resolve(data);
      };
    });
  }
}
