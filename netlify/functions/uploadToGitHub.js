// netlify/functions/uploadToGitHub.js
import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { filename, content, branch } = JSON.parse(event.body);

    const repoOwner = "oguzhndlc"; // GitHub kullanıcı adı
    const repoName = "MertSite";    // Repo adı
    const filePath = "images/cards/" + filename;
    const token = process.env.GITHUB_TOKEN; // Netlify ortam değişkeni

    // 1️⃣ Dosya var mı kontrol et
    const checkUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${branch}`;
    let sha = null;

    const check = await fetch(checkUrl, { headers: { Authorization: `token ${token}` } });

    if (check.ok) {
      const existing = await check.json();
      sha = existing.sha; // varsa güncellemek için sha al
    }

    // 2️⃣ Dosyayı yükle veya güncelle
    const bodyData = {
      message: sha ? `Update ${filename}` : `Add ${filename}`,
      content: content,
      branch: branch
    };
    if (sha) bodyData.sha = sha;

    const upload = await fetch(checkUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });

    if (!upload.ok) {
      const text = await upload.text();
      return { statusCode: 500, body: `GitHub Hatası: ${text}` };
    }

    const result = await upload.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Dosya GitHub'a yüklendi!",
        file: result.content.path,
        url: result.content.html_url
      })
    };
  } catch (err) {
    return { statusCode: 500, body: `Hata: ${err.message}` };
  }
};
