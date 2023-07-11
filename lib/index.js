var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CLIENT_ID = "211248772755-2v8kt21le74akc0pmfcic6pf636lnln8.apps.googleusercontent.com";
var API_KEY = "AIzaSyAmfUZPT8K0dFAhGiUGrvrQ97WZ-P5wvVw";
var DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
var SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";
var tokenClient;
var gapiInited = false;
var gisInited = false;
var loadScript = function (src, callback) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = src;
        script.onload = function () {
            callback && callback();
            resolve(true);
        };
        script.onerror = reject;
        document.body.appendChild(script);
    });
};
var initializeGapiClient = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gapi.client.init({
                    apiKey: API_KEY,
                    discoveryDocs: [DISCOVERY_DOC],
                })];
            case 1:
                _a.sent();
                gapiInited = true;
                return [2 /*return*/];
        }
    });
}); };
var gapiLoaded = function () {
    gapi.load("client", initializeGapiClient);
};
var gisLoaded = function () {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: "",
    });
    gisInited = true;
};
export var listFiles = function (type, folderId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var param;
                return __generator(this, function (_a) {
                    param = {
                        corpora: "user",
                        fields: "nextPageToken,files(id,name,size,mimeType,trashed,imageMediaMetadata,owners,modifiedTime,sharedWithMeTime, thumbnailLink,webContentLink)",
                        pageSize: 40,
                    };
                    if (type === "cloud") {
                        param.q = "'".concat(folderId || "root", "' in parents and (mimeType = 'application/pdf' or mimeType = 'image/png' or mimeType = 'image/jpeg' or mimeType = 'image/webp' or mimeType = 'image/gif' or mimeType = 'application/vnd.google-apps.folder' or mimeType = 'application/vnd.google-apps.document' or mimeType = 'application/vnd.google-apps.drawing' or mimeType = 'application/vnd.google-apps.presentation' or mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.jam') and trashed = false");
                    }
                    if (type === "share") {
                        if (folderId) {
                            param.q = "'".concat(folderId, "' in parents and (mimeType = 'application/pdf' or mimeType = 'image/png' or mimeType = 'image/jpeg' or mimeType = 'image/webp' or mimeType = 'image/gif' or mimeType = 'application/vnd.google-apps.folder' or mimeType = 'application/vnd.google-apps.document' or mimeType = 'application/vnd.google-apps.drawing' or mimeType = 'application/vnd.google-apps.presentation' or mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.jam') and trashed = false");
                        }
                        else {
                            param.q = "sharedWithMe = true and (mimeType = 'application/pdf' or mimeType = 'image/png' or mimeType = 'image/jpeg' or mimeType = 'image/webp' or mimeType = 'image/gif' or mimeType = 'application/vnd.google-apps.folder' or mimeType = 'application/vnd.google-apps.document' or mimeType = 'application/vnd.google-apps.drawing' or mimeType = 'application/vnd.google-apps.presentation' or mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.jam') and trashed = false";
                        }
                    }
                    gapi.client.drive.files
                        .list(param)
                        .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log(24566, res);
                            resolve({
                                data: res.result,
                            });
                            return [2 /*return*/];
                        });
                    }); })
                        .catch(function (err) {
                        reject({
                            data: [],
                        });
                    });
                    return [2 /*return*/];
                });
            }); })];
    });
}); };
loadScript("https://apis.google.com/js/api.js", gapiLoaded);
loadScript("https://accounts.google.com/gsi/client", gisLoaded);
var googleDrive = /** @class */ (function () {
    function googleDrive() {
    }
    //获取实例
    googleDrive.getInstance = function () {
        if (!this._instance) {
            this._instance = new googleDrive();
        }
        return this._instance;
    };
    googleDrive.auth = function (type, folderId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!gapiInited || !gisInited) {
                    throw new Error("初始化失败");
                }
                console.log(gapiInited, gisInited);
                return [2 /*return*/, new Promise(function (resolve) {
                        if (gapi.client.getToken() === null) {
                            console.log("----------", gapi.client.getToken());
                            tokenClient.requestAccessToken({ prompt: "consent" });
                        }
                        else {
                            console.log("==========", gapi.client.getToken());
                            tokenClient.requestAccessToken({ prompt: "" });
                        }
                        tokenClient.callback = function (resp) { return __awaiter(_this, void 0, void 0, function () {
                            var data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (resp.error !== undefined) {
                                            throw resp;
                                        }
                                        return [4 /*yield*/, listFiles(type, folderId)];
                                    case 1:
                                        data = (_a.sent()).data;
                                        resolve(data);
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                    })];
            });
        });
    };
    googleDrive.listFiles = function (type, folderId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, listFiles(type, folderId)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return googleDrive;
}());
export default googleDrive;
