module.exports = async (params) => {
    const { app } = params;
    
    const activeFile = app.workspace.getActiveFile();
    
    if (!activeFile) {
        new Notice("ファイルが開かれていません");
        return;
    }
    
    const cache = app.metadataCache.getFileCache(activeFile);
    const currentStatus = cache?.frontmatter?.isPublish || false;
    
    let content = await app.vault.read(activeFile);
    
    // 現在の日時を取得
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timestamp = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    // フロントマターの部分だけを抽出
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (!frontmatterMatch) {
        new Notice("フロントマターが見つかりません");
        return;
    }
    
    let frontmatter = frontmatterMatch[1];
    const restOfContent = content.substring(frontmatterMatch[0].length);
    
    if (currentStatus) {
        // 非公開にする
        frontmatter = frontmatter.replace(/isPublish:\s*true/, 'isPublish: false');
        await app.vault.modify(activeFile, `---\n${frontmatter}\n---${restOfContent}`);
        new Notice("公開を取り消しました");
    } else {
        // 公開する
        frontmatter = frontmatter.replace(/isPublish:\s*false/, 'isPublish: true');
        
        // publishDateを更新
        if (frontmatter.includes('publishDate:')) {
            frontmatter = frontmatter.replace(/publishDate:\s*.*/, `publishDate: ${timestamp}`);
        } else {
            // publishDateがない場合は追加
            frontmatter += `\npublishDate: ${timestamp}`;
        }
        
        await app.vault.modify(activeFile, `---\n${frontmatter}\n---${restOfContent}`);
        new Notice(`公開しました（${timestamp}）`);
    }
};