const express = require("express");
const session = require("express-session");
const cors = require("cors");
const qs = require("qs");
const axios = require("axios");
const path = require("path");
const app = express();
const port = 4000;
const client_id = "c674afedddbe5bb7f5d5233afd4d91e2";
const redirect_uri = "http://localhost:3005/auth/kakao/callback";
const token_uri = "https://kauth.kakao.com/oauth/token";
const api_host = "https://kapi.kakao.com";
const client_secret = "";
const origin = "http://localhost:4000";
app.use(
    session({
        secret: "your session secret",
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false},
    })
);
let corsOptions = {
    origin: origin,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname)));

app.get("/authorize", function (req, res) {
    let {scope} = req.query;
    let scopeParam = "";
    if (scope) {
        scopeParam = "&scope=" + scope;
    }
    console.log(`scopeParam: ${scopeParam}`);
    res
        .status(200)
        .redirect(
            `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code${scopeParam}`
        );
});

async function call(method, uri, param, header) {
    try {
        rtn = await axios({
            method: method,
            url: uri,
            headers: header,
            data: param,
        });
    } catch (err) {
        rtn = err.response;
    }
    return rtn.data;
}

app.get("/redirect", async function (req, res) {
    const param = qs.stringify({
        grant_type: "authorization_code",
        client_id: client_id,
        redirect_uri: redirect_uri,
        client_secret: client_secret,
        code: req.query.code,
    });
    const header = {"content-type": "application/x-www-form-urlencoded"};
    console.log(`param: ${param}, token_uri: ${token_uri}, header: ${header}`);
    var rtn = await call("POST", token_uri, param, header);
    req.session.key = rtn.access_token;
    // console.log(req)
    // console.log(rtn)
    res.status(302).redirect(`${origin}/index.html`);
});

app.get("/profile", async function (req, res) {
    const uri = api_host + "/v2/user/me";
    const param = {};
    const header = {
        "content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + req.session.key,
    };
    var rtn = await call("POST", uri, param, header);
    res.send(rtn);
});

app.get("/friends", async function (req, res) {
    const uri = api_host + "/v1/api/talk/friends";
    const param = null;
    const header = {
        Authorization: "Bearer " + req.session.key,
    };
    var rtn = await call("GET", uri, param, header);
    res.send(rtn);
});

app.get("/message", async function (req, res) {
    const uri = api_host + "/v2/api/talk/memo/default/send";
    const param = qs.stringify({
        template_object:
            "{" +
            '"object_type": "text",' +
            '"text": "텍스트 영역입니다. 최대 200자 표시 가능합니다.",' +
            '"link": {' +
            '    "web_url": "https://developers.kakao.com",' +
            '    "mobile_web_url": "https://developers.kakao.com"' +
            "}," +
            '"button_title": "바로 확인"' +
            "}",
    });
    const header = {
        "content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + req.session.key,
    };
    const rtn = await call("POST", uri, param, header);
    res.send(rtn);
});

app.get("/friends_message", async function (req, res) {
    const uri = api_host + "/v1/api/talk/friends/message/default/send";
    let {uuids} = req.query;
    const param = qs.stringify({
        receiver_uuids: '['+uuids+']',
        template_object:
            "{" +
            '"object_type": "text",' +
            '"text": "텍스트 영역입니다. 최대 200자 표시 가능합니다.",' +
            '"link": {' +
            '    "web_url": "https://developers.kakao.com",' +
            '    "mobile_web_url": "https://developers.kakao.com"' +
            "}," +
            '"button_title": "바로 확인"' +
            "}",
    });
    const header = {
        "content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + req.session.key,
    };
    const rtn = await call("POST", uri, param, header);
    res.send(rtn);
});

app.get("/logout", async function (req, res) {
    const uri = api_host + "/v1/user/logout";
    const param = null;
    const header = {
        Authorization: "Bearer " + req.session.key,
    };
    var rtn = await call("POST", uri, param, header);
    res.send(rtn);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
