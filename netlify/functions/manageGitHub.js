// netlify/functions/manageGitHubFile.js

export const handler = async (event) => {
  const repoOwner = "oguzhndlc";
  const repoName = "MertSite";
  const token = process.env.GITHUB_TOKEN;

  try {
    if (!["POST", "DELETE"].includes(event.httpMethod)) {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body);
    const { filename, content, branch = "main", action } = body;
    const filePath = "images/cards/" + filename;

    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    // İlk önce dosya var mı kontrol et
    let sha = null;
    const check = await fetch(url + `?ref=${branch}`, {
      headers: { Authorization: `token ${token}` },
    });

    if (check.ok) {
      const data = await check.json();
      sha = data.sha;
    }

    // --- Yükleme veya Güncelleme ---
    if (action === "upload") {
      const uploadBody = { message: sha ? `Update ${filename}` : `Add ${filename}`, content, branch };
      if (sha) uploadBody.sha = sha;

      const upload = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadBody),
      });

      if (!upload.ok) {
        const text = await upload.text();
        return { statusCode: 500, body: `GitHub Hatası: ${text}` };
      }

      const result = await upload.json();
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Dosya GitHub'a yüklendi/güncellendi!",
          file: result.content.path,
          url: result.content.html_url,
        }),
      };
    }

    // --- Silme ---
    else if (action === "delete") {
      if (!sha) return { statusCode: 404, body: "Dosya bulunamadı." };

      const delResponse = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Delete ${filename}`,
          branch,
          sha,
        }),
      });

      if (!delResponse.ok) {
        const text = await delResponse.text();
        return { statusCode: 500, body: `GitHub Silme Hatası: ${text}` };
      }

      const delResult = await delResponse.json();
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Dosya GitHub’dan silindi!",
          file: delResult.content?.path || filename,
        }),
      };
    }

    return { statusCode: 400, body: "Geçersiz action değeri" };
  } catch (err) {
    return { statusCode: 500, body: `Hata: ${err.message}` };
  }
};
